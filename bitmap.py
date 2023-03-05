import numpy
from PIL import Image

def parse_bitmap():
    with open('point_cloud.txt') as f:
        data = f.read().strip()

    data = data.replace('(', '').replace(')', '').replace(' ', '').split('\n')
    data = [tuple(map(lambda a : int(100 * round((float(a)/10), 10)), i.split(','))) for i in data]

    return data


def main():
    data = sorted(parse_bitmap(), key=lambda x: x[2])
    d = 100
    r = 100
    data_map = [[0 for j in range(r)] for i in range(d)]
    for x, _, z in data:
        data_map[(x - min(data)[0]) // 10][(z - data[0][2]) // 10] += 1;
    data_map = [list(map(lambda x: 1 if x >= 50 else 0, i)) for i in data_map]
    f = open('map.txt', 'w')
    for i in data_map:
        for j in i:
            f.write(str(j))
            f.write('\n')

if __name__ == "__main__":
   main()
