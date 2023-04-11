import pandas as pd
import matplotlib.pyplot as plt


def exampleBarChars():
    # Read your data from file
    file = "data.txt"
    df = pd.read_csv(file, sep=",", header=None, names=['Chrome', 'Explorer', 'Firefox'])

    # width of the bars
    barWidth = 0.6

    # Bars Data
    barsData = df.mean()

    # The x-position order of bars
    barsOrder = range(len(df.columns))

    # Std Bars Interval
    # barsInterval = df.std()

    # Standard Error Bars intervals
    barsInterval = df.sem()

    # Colours of bar charts
    colors = ["red", "green", "blue"]

    # Opacity of colours
    Opacity = 0.5

    # Start values from bottom of the bars
    minValue = df.values.min()

    # Interval cap size
    intervalCapsize = 7

    # Plot bars
    plt.bar(barsOrder, barsData, color=colors, edgecolor='black', width=barWidth,
            yerr=barsInterval, capsize=7, alpha=Opacity, bottom=intervalCapsize)

    # Put a tick on the x-axis undex each bar and label it with column name
    plt.xticks(range(len(df.columns)), df.columns)

    plt.ylabel('Load time')
    # plt.xlabel('Browsers')
    plt.title('Load-Time Means Comparison')
    plt.show()


exampleBarChars()