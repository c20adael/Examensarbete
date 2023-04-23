import scipy.stats as stats
import numpy as np
import statsmodels.stats.multicomp as multi
import pandas as pd


def anova(*data): # * indicates, 0, 1 , 2 .. arguments

    if len(data) == 2:
        statistic, pvalue = stats.f_oneway(data[0], data[1])
    elif len(data) == 3:
        statistic, pvalue = stats.f_oneway(data[0], data[1], data[2])
    elif len(data) == 4:
        statistic, pvalue = stats.f_oneway(data[0], data[1], data[2], data[3])


    print("ANOVA Statistic " + str(statistic) + " and p-value " + str(pvalue))

    if pvalue < 0.05: #alpha = 0.05
        return True
    else:
        return False



def exampleAnova():

    #Determine the group labels
    browsers = ['INSERT_MySQL','INSERT_MongoDB']

    #Read your data from file
    file = "Pilotstudie_Data/merged_SELECT_MYSQL_mongoDB.txt"
    df = pd.read_csv(file, sep=",", header=None, names=['INSERT_MySQL','INSERT_MongoDB'])


    #Run Anova on data groups
    if (anova (df['INSERT_MySQL'], df['INSERT_MongoDB'])):
        print ("The means are different")
    else:
        print ("No differences in means")

exampleAnova()
