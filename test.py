import json
f = open("bing-graph-dataset.json", 'r')
data = json.load(f)

x = [i for i in range(len(data['india']))]
y = []

for i in data['india']:
    y.append(i['confirmed'])
plt.plot(x, y)

