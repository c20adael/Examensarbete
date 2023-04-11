import scipy.stats as stats
import numpy as np
import statsmodels.stats.multicomp as multi
import pandas as pd
import matplotlib.pyplot as plt


def exampleSummaryStats():
    # list your data.txt directly
    #data1 = [93, 98, 133, 128, 95, 98, 131, 118, 108, 122]
    #data2 = [107, 342, 328, 118, 477, 270, 283, 176, 399, 97]
    #data3 = [167, 199, 261, 135, 113, 246, 159, 225, 157, 229]

    # Read your data.txt from file
    file = "data.txt"
    df = pd.read_csv(file, sep=",", header=None, names=['Chrome', 'Explorer', 'Firefox'])

    # Put data.txt into dataframe
    #df = pd.DataFrame()
    #df['Chrome']
    #df['Explorer']
    #df['Firefox']

    print(df.mean())

    print(df.std())


exampleSummaryStats()