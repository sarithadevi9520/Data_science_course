from sklearn.base import BaseEstimator, TransformerMixin

class OutlierHandler(BaseEstimator, TransformerMixin):

    def __init__(self, columns=None):
        self.columns = columns

    def fit(self, X, y=None):
        self.bounds_ = {}

        for column in self.columns:
            Q1 = X[column].quantile(0.25)
            Q3 = X[column].quantile(0.75)

            IQR = Q3 - Q1

            lower_bound = Q1 - 1.5 * IQR
            upper_bound = Q3 + 1.5 * IQR

            self.bounds_[column] = (
                lower_bound,
                upper_bound
            )

        return self

    def transform(self, X):
        X = X.copy()

        for column in self.columns:

            lower_bound, upper_bound = self.bounds_[column]

            X[column] = X[column].clip(
                lower=lower_bound,
                upper=upper_bound
            )

        return X
    
    
class FeatureSelector(BaseEstimator, TransformerMixin):

    def __init__(self, columns_to_drop=None):
        self.columns_to_drop = columns_to_drop

    def fit(self, X, y=None):
        return self

    def transform(self, X):
        X = X.copy()

        X = X.drop(
            columns=self.columns_to_drop
        )

        return X