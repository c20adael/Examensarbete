import pandas as pd
import matplotlib.pyplot as plt
import glob
filenames = ['test_data_MYSQL.txt', 'test_data_mongoDB.txt']

#Read your data from file
fil1 = pd.read_csv(filenames[0], sep=",", header=None, names=['ms','query'])
fil2 = pd.read_csv(filenames[1], sep=",", header=None, names=['ms','query'])


file1ms = fil1['ms'].tolist()
file2ms = fil2['ms'].tolist()


csv_file = ""
for i in range(999):
    csv_file += str(file1ms[i]) + "," + str(file2ms[i]) + "\n"
print(csv_file)

with open('merged_ms_MYSQL_mongoDB_test_pilot.txt', 'w') as f:
    f.write(csv_file)




