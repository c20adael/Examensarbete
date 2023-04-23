import scipy.stats as stats
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

def mean_confidence_interval(data, confidence=0.95):
    a = 1.0 * np.array(data)
    n = len(a)
    m, se = np.mean(a), stats.sem(a)
    h = se * stats.t.ppf((1 + confidence) / 2., n-1)
    return -h, +h


#Read your data from file
file = "Pilotstudie_Data/merged_SELECT_MYSQL_mongoDB.txt"
df = pd.read_csv(file, sep=",", header=None, names=['MySQL', 'MongoDB'])


print ("CIs MySQL: ", mean_confidence_interval(df['MySQL']))
print ("CIs MongoDB", mean_confidence_interval(df['MongoDB']))



#Read your data from file
#file = "data.txt"
#df = pd.read_csv(file, sep=",", header=None, names=['Chrome','Explorer','Firefox'])


CI_MySQL = mean_confidence_interval(df['MySQL'])
CI_MongoDB = mean_confidence_interval(df['MongoDB'])


# width of the bars
barWidth = 0.6

# Bars Data
barsData = df.mean()

# The x-position order of bars
barsOrder = range(len(df.columns))

# Std Bars Interval
# barsInterval = df.std()

# Bars for CI Intervals
df_CI = pd.DataFrame(list(zip(CI_MySQL, CI_MongoDB)), columns = ['MySQL','MongoDB'])

barsInterval = df_CI.iloc[1]


# Colours of bar charts
colors=["red", "green"]

# Opacity of colours
Opacity = 0.5

# Start values from bottom of the bars
minValue = df.values.min()

# Interval cap size
intervalCapsize = 7

# Plot bars
plt.bar(barsOrder, barsData, color=colors, edgecolor='black', width=barWidth, yerr=barsInterval, capsize=7, alpha=Opacity, bottom=0)
plt.ylim(0, 10)
#Put a tick on the x-axis undex each bar and label it with column name
plt.xticks(range(len(df.columns)), ["SELECT_MySQL", "SELECT_MongoDB"])

plt.ylabel('ms')
#plt.xlabel('Browsers')
plt.title('SELECT Means Comparison\n Confidence Intervals')
plt.savefig("Select_Means_CI.png")
plt.show()
