import pandas as pd
import matplotlib.pyplot as plt



#Read your data.txt from file
file = "test_data_MYSQL.txt"
file2 = "test_data_mongoDB.txt"
df = pd.read_csv(file, sep=",", header=None, names=['ms','query'])
df2 = pd.read_csv(file2, sep=",", header=None, names=['ms','query'])

# Plot line serie of data.txt
#Get a list of numbers from 1 to 10
x = range(0,999)
# Because plotting takes list arguments
y = df['ms'].tolist()
y2 = df2['ms'].tolist()
plt.plot(x, y, color='orange', label="MySQL")
plt.plot(x, y2, color='grey', label="MongoDB")
plt.xlabel('insert')
plt.ylabel('ms')
plt.title('Insert time comparison')
plt.legend()
plt.grid(True)

plt.savefig("Insert_time_comparison_MySQL_MongoDB_pilot.png")
plt.show()