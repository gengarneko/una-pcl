#!/usr/bin.python3
'''
生成测试数据
'''
import json
import uuid
import re
import os

page = {
    'data': {
        'uuid': uuid.uuid4().__str__(),
        'frames': []
    },
    'template': {
        'name': 'web3d',
        'tags': [],
        'plugins': [
            {
                'name': 'rect',
                'params': {}
            },
            {
                'name': 'parsing',
                'params': {}
            },
            {
                'name': 'projection2d',
                'params': {}
            },
            {
                'name': 'three-view',
                'params': {}
            }
        ]
    },
    'response': {
        'id': 200
    },
    'annotations': [],
    'answers': []
}

prefix = '/200'

prog = re.compile('^(.*?)_(.*)$')

index = 0
for frame_dir in os.listdir('./'):
    if os.path.isdir(frame_dir) == False:
        continue
    index += 1
    frame = {
        'index': index,
        'url': '',
        'points': 230400,
        'pose': [
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 1.0
        ],
        'cameras': [
        ]
    }
    with open('./' + frame_dir +'/velodyne_points/pose.txt', 'r') as f:
        line = f.readline()
        frame['pose'] = [float(i) for i in line.strip().split(' ')]
    for pcd in os.listdir('./' + frame_dir +'/velodyne_points/'):
        if pcd.endswith('.pcd') == False:
            continue
        full_pcd = frame_dir +'/velodyne_points/' + pcd
        frame['url'] = prefix + '/' + full_pcd
        with open(full_pcd, 'rb') as pcd_file:
            header = b''
            while True:
                line = pcd_file.readline()
                header += line
                if line.startswith(b'DATA'):
                    break
            header = header.decode('ascii')
            for line in header.splitlines():
                if line.startswith('POINTS'):
                    frame['points'] = int(line.split()[1])
                    break

    params = {}
    with open('./' + frame_dir + '/params/params.txt', 'r') as f:
        for line in f:
            line_sp = line.split(':')
            key = line_sp[0]
            data = line_sp[1]
            if key.startswith('calib_'):
                key = key[6:]
            match = prog.match(key)
            if not (match[1] in params):
                params[match[1]] = {}
            if match[2] == 'to_velodyne64':
                params[match[1]]['M'] = [float(i) for i in data.strip().split(' ')]
            elif match[2] == 'D':
                params[match[1]]['D'] = [float(i) for i in data.strip().split(' ')]
            elif match[2] == 'K':
                params[match[1]]['K'] = [float(i) for i in data.strip().split(' ')]
            elif match[2] == 'image_width':
                params[match[1]]['width'] = float(data.strip())
            elif match[2] == 'image_height':
                params[match[1]]['height'] = float(data.strip())
    for key in params:
        url = '###'
        for file in os.listdir('./' + frame_dir + '/images/' + key):
            if file.endswith('.jpg') or file.endswith('.png'):
                url = prefix + '/'+ frame_dir + '/images/' + key + '/' + file
                break
        frame['cameras'].append({
            'name': key,
            'url': url,
            'params': {
                'distortionCoefficients': {
                    'k1': params[key]['D'][0],
                    'k2': params[key]['D'][1],
                    'k3': params[key]['D'][2],
                    'k4': params[key]['D'][3],
                },
                'distortionType': 'fisheye',
                'M': params[key]['M'],
                'K': params[key]['K'],
                'width': params[key]['width'],
                'height': params[key]['height']
            }
        })

    page['data']['frames'].append(frame)

page['data']['frames'].sort(key=lambda x:x['url'])
for i in range(len(page['data']['frames'])):
    page['data']['frames'][i]['index'] = i + 1
print(json.dumps(page))
exit()
