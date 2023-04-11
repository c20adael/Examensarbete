import pandas as pd
import matplotlib.pyplot as plt



#Read your data.txt from file
file = "test_data_MYSQL.txt"
df = pd.read_csv(file, sep=",", header=None, names=['ms','query'])

# Plot line serie of data.txt
#Get a list of numbers from 1 to 10
x = range(0,999)
# Because plotting takes list arguments
y = df['ms'].tolist()
plt.plot(x, y)
plt.xlabel('Run')
plt.ylabel('Data')
plt.title('Chrome load-time raw data.txt')
plt.grid(True)


plt.show()