import pandas as pd
import matplotlib.pyplot as plt
import glob
filenames = ['Pilotstudie_Data/SELECT_data_MySQL.txt', 'Pilotstudie_Data/SELECT_data_MongoDB.txt']

#Read your data from file
fil1 = pd.read_csv(filenames[0], sep=",", header=None, names=['state','ms','resultat',''])
fil2 = pd.read_csv(filenames[1], sep=",", header=None, names=['state','ms','resultat',''])


file1ms = fil1['ms'].tolist()
file2ms = fil2['ms'].tolist()


csv_file = ""
for i in range(10000):
    csv_file += str(file1ms[i]) + "," + str(file2ms[i]) + "\n"
print(csv_file)

with open('merged_SELECT_MYSQL_mongoDB.txt', 'w') as f:
    f.write(csv_file)




