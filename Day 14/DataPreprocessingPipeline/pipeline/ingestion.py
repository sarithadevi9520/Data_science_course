import seaborn as sns


def load_titanic_data():
    df = sns.load_dataset("titanic")
    return df