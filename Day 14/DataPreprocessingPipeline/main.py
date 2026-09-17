from pipeline.ingestion import load_titanic_data
from pipeline.preprocessing import OutlierHandler, FeatureSelector

from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score,classification_report,confusion_matrix
from database import create_connection,store_data


# Numerical columns
numerical_columns = [
    "age",
    "sibsp",
    "parch",
    "fare"
]


# Numerical preprocessing
numerical_pipeline = Pipeline([
    ("outlier_handler", OutlierHandler(columns=numerical_columns)),
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler())
])


# Categorical columns
categorical_columns = [
    "sex",
    "embarked"
]


# Categorical preprocessing
categorical_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("encoder", OneHotEncoder(
        handle_unknown="ignore",
        drop="first"
    ))
])


# Combine preprocessing
preprocessor = ColumnTransformer(
    transformers=[
        ("numerical", numerical_pipeline, numerical_columns),
        ("categorical", categorical_pipeline, categorical_columns)
    ]
)


# Load data
df = load_titanic_data()

cleaned_df = df.copy()

cleaned_df["age"] = cleaned_df["age"].fillna(
    cleaned_df["age"].median()
)

cleaned_df["embarked"] = cleaned_df["embarked"].fillna(
    cleaned_df["embarked"].mode()[0]
)

cleaned_df = cleaned_df.drop(columns=["deck"])

cleaned_df = cleaned_df.drop(
    columns=["class", "alive", "embark_town", "who"]
)

connection = create_connection()

store_data(cleaned_df, connection)

print("Structured cleaned data stored successfully.")

X = df.drop(columns=["survived"])
y = df["survived"]


# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)


# Complete pipeline
model_pipeline = Pipeline([
    ("feature_selection", FeatureSelector(
        columns_to_drop=[
            "class",
            "alive",
            "deck",
            "embark_town"
        ]
    )),
    ("preprocessor", preprocessor),
    ("model", LogisticRegression(max_iter=1000))
])


# Train model
model_pipeline.fit(X_train, y_train)
print("Model training completed.")

y_pred = model_pipeline.predict(X_test)
print("Predictions completed.")

accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)


print("Classification Report:")
print(classification_report(y_test, y_pred))


cm = confusion_matrix(y_test, y_pred)

print("Confusion Matrix:")
print(cm)


connection = create_connection()

print("Database connected successfully.")