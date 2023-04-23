import pandas as pd
import matplotlib.pyplot as plt



#Read your data.txt from file
file = "Pilotstudie_Data/SELECT_data_MySQL.txt"
file2 = "Pilotstudie_Data/SELECT_data_MongoDB.txt"
df = pd.read_csv(file, sep=",", header=None, names=['state','ms','resultat',''])
df2 = pd.read_csv(file2, sep=",", header=None, names=['state','ms','resultat',''])

# Plot line serie of data.txt
#Get a list of numbers from 1 to 10
x = range(0,10000)
# Because plotting takes list arguments
y = df['ms'].tolist()
y2 = df2['ms'].tolist()
plt.gcf().set_size_inches(16, 8)
plt.plot(x, y, color='red', label="MySQL")
plt.plot(x, y2, color='green', label="MongoDB")
plt.xlabel('query')
plt.ylabel('ms')
plt.title('SELECT Operation time comparison')
plt.legend()
plt.grid(True)

plt.savefig("Select_time_comparison_MySQL_MongoDB_pilot.png")
plt.show()