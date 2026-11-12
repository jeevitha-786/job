from pathlib import Path

import joblib
import pandas as pd
import streamlit as st


# --------------------------------------------------
# 1. Project paths
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "models"
DATA_DIR = BASE_DIR / "data"

MODEL_PATH = MODEL_DIR / "student_model.pkl"
FEATURE_PATH = MODEL_DIR / "feature_columns.pkl"
COMPARISON_PATH = MODEL_DIR / "model_comparison.csv"
DATA_PATH = DATA_DIR / "training.csv"
CHALLENGE_PATH = DATA_DIR / "surprise_challenge.csv"


# --------------------------------------------------
# 2. Page configuration
# --------------------------------------------------

st.set_page_config(
    page_title="ZENITH | Student Performance",
    page_icon="🎓",
    layout="wide",
    initial_sidebar_state="expanded"
)


# --------------------------------------------------
# 3. Custom styling
# --------------------------------------------------

st.markdown(
    """
    <style>
    /* Main application background */
    .stApp {
        background-color: #F8FAFC;
    }

    /* Main content spacing */
    .block-container {
        padding-top: 2rem;
        padding-bottom: 2rem;
        max-width: 1400px;
    }

    /* Custom Typography */
    .main-title {
        font-size: 2.3rem;
        font-weight: 800;
        color: #14213D;
        letter-spacing: -0.5px;
        margin-bottom: 0.2rem;
    }

    .subtitle {
        font-size: 1.05rem;
        color: #4A5568;
        font-weight: 500;
        margin-bottom: 1.2rem;
    }

    .section-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #14213D;
        margin-top: 0.5rem;
        margin-bottom: 1.2rem;
        border-bottom: 2px solid #E2E8F0;
        padding-bottom: 0.4rem;
    }

    /* Metric cards */
    div[data-testid="stMetric"] {
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        padding: 20px;
        border-radius: 14px;
        box-shadow: 0 4px 14px rgba(20, 33, 61, 0.05);
    }

    /* Sidebar */
    section[data-testid="stSidebar"] {
        background-color: #14213D;
    }

    section[data-testid="stSidebar"] * {
        color: #FFFFFF;
    }

    /* Buttons */
    div.stButton > button,
    div.stFormSubmitButton > button {
        border-radius: 10px;
        font-weight: 600;
        min-height: 44px;
        transition: 0.2s ease;
    }

    /* Form containers */
    div[data-testid="stForm"] {
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        padding: 24px;
        border-radius: 14px;
        box-shadow: 0 4px 14px rgba(20, 33, 61, 0.04);
    }

    /* Data tables */
    div[data-testid="stDataFrame"] {
        border-radius: 12px;
        overflow: hidden;
    }
    </style>
    """,
    unsafe_allow_html=True
)



# --------------------------------------------------
# 4. Load the trained model
# --------------------------------------------------

@st.cache_resource
def load_model():
    model = joblib.load(MODEL_PATH)
    feature_columns = joblib.load(FEATURE_PATH)
    return model, feature_columns


@st.cache_data
def load_dataset(file_path_str: str):
    file_path = Path(file_path_str)
    if not file_path.exists():
        return None
    return pd.read_csv(file_path)


# --------------------------------------------------
# 5. Header
# --------------------------------------------------

st.markdown(
    '<div class="main-title">🎓 ZENITH</div>',
    unsafe_allow_html=True
)

st.markdown(
    '<div class="subtitle">'
    'Student Performance Prediction System | Machine Learning'
    '</div>',
    unsafe_allow_html=True
)

st.divider()


# --------------------------------------------------
# 6. Check model availability
# --------------------------------------------------

if not MODEL_PATH.exists() or not FEATURE_PATH.exists():
    st.error(
        "Trained model files were not found. "
        "Run the training script first."
    )
    st.code("python .\\src\\train.py")
    st.stop()


try:
    model, feature_columns = load_model()
except Exception as error:
    st.error(f"Could not load the trained model: {error}")
    st.stop()


# --------------------------------------------------
# 7. Sidebar navigation
# --------------------------------------------------

st.sidebar.title("ZENITH Navigation")

page = st.sidebar.radio(
    "Choose a page",
    [
        "Dashboard",
        "Predict Performance",
        "Model Comparison",
        "Dataset Explorer",
        "About Project"
    ]
)

st.sidebar.divider()

st.sidebar.info(
    "This system estimates a student's final grade "
    "from the supplied academic and personal data."
)


# --------------------------------------------------
# 8. Dashboard page
# --------------------------------------------------

if page == "Dashboard":

    st.markdown(
        '<div class="section-title">Project Overview</div>',
        unsafe_allow_html=True
    )

    st.write(
        "ZENITH uses machine learning to estimate student "
        "final grades from previous assessment scores, "
        "study habits, attendance-related information, "
        "and other available dataset features."
    )

    best_model_name = "Gradient Boosting"
    best_mae = "0.9942"
    best_r2 = "0.8473"
    best_rmse = None

    if COMPARISON_PATH.exists():
        try:
            comp_df = pd.read_csv(COMPARISON_PATH)
            if not comp_df.empty:
                top_row = comp_df.iloc[0]
                best_model_name = str(top_row.get("Model", best_model_name))
                best_mae = f"{float(top_row['MAE']):.4f}" if "MAE" in top_row else best_mae
                best_r2 = f"{float(top_row['R2']):.4f}" if "R2" in top_row else best_r2
                if "RMSE" in top_row:
                    best_rmse = f"{float(top_row['RMSE']):.4f}"
        except Exception:
            pass

    if best_rmse:
        c1, c2, c3, c4 = st.columns(4)
        c1.metric("Top Model", best_model_name)
        c2.metric("Validation MAE", best_mae)
        c3.metric("Validation RMSE", best_rmse)
        c4.metric("Validation R²", best_r2)
    else:
        c1, c2, c3 = st.columns(3)
        c1.metric("Top Model", best_model_name)
        c2.metric("Validation MAE", best_mae)
        c3.metric("Validation R²", best_r2)

    st.subheader("How the System Works")

    st.markdown(
        """
        1. **Input:** Collect student information.
        2. **Preprocessing:** Handle missing values and encode categories.
        3. **Prediction:** Use the saved machine learning pipeline.
        4. **Output:** Display the estimated final grade.
        """
    )

    st.info(
        "The displayed metrics come from the model evaluation "
        "recorded during training. They are not a guarantee "
        "of accuracy for every new student."
    )


# --------------------------------------------------
# 9. Prediction page
# --------------------------------------------------

elif page == "Predict Performance":

    st.markdown(
        '<div class="section-title">Predict Student Performance</div>',
        unsafe_allow_html=True
    )

    st.write(
        "Enter the student's details below. "
        "Fields are based on the features used during training."
    )

    with st.form("student_prediction_form"):

        st.subheader("Academic Information")

        c1, c2, c3 = st.columns(3)

        with c1:
            school = st.selectbox("School", ["GP", "MS"])
            age = st.number_input(
                "Age", min_value=15, max_value=22, value=17
            )
            studytime = st.selectbox(
                "Weekly study time",
                [1, 2, 3, 4],
                format_func=lambda x: {
                    1: "< 2 hours",
                    2: "2–5 hours",
                    3: "5–10 hours",
                    4: "> 10 hours"
                }[x]
            )

        with c2:
            G1 = st.number_input(
                "First-period grade (G1)",
                min_value=0, max_value=20, value=10
            )
            G2 = st.number_input(
                "Second-period grade (G2)",
                min_value=0, max_value=20, value=10
            )
            absences = st.number_input(
                "Absences",
                min_value=0, max_value=100, value=0
            )

        with c3:
            failures = st.number_input(
                "Previous class failures",
                min_value=0, max_value=4, value=0
            )
            traveltime = st.selectbox(
                "Travel time to school",
                [1, 2, 3, 4]
            )
            schoolsup = st.selectbox(
                "Extra educational support",
                ["yes", "no"]
            )

        st.subheader("Personal and Family Information")

        c4, c5, c6 = st.columns(3)

        with c4:
            sex = st.selectbox("Sex", ["F", "M"])
            address = st.selectbox("Home address", ["U", "R"])
            famsize = st.selectbox(
                "Family size", ["GT3", "LE3"]
            )
            Pstatus = st.selectbox(
                "Parents' cohabitation status", ["T", "A"]
            )

        with c5:
            Medu = st.selectbox(
                "Mother's education level", [0, 1, 2, 3, 4]
            )
            Fedu = st.selectbox(
                "Father's education level", [0, 1, 2, 3, 4]
            )
            Mjob = st.selectbox(
                "Mother's job",
                ["teacher", "health", "services", "at_home", "other"]
            )
            Fjob = st.selectbox(
                "Father's job",
                ["teacher", "health", "services", "at_home", "other"]
            )

        with c6:
            reason = st.selectbox(
                "Reason for choosing school",
                ["home", "reputation", "course", "other"]
            )
            guardian = st.selectbox(
                "Guardian", ["mother", "father", "other"]
            )
            famrel = st.selectbox(
                "Family relationship quality", [1, 2, 3, 4, 5]
            )
            freetime = st.selectbox(
                "Free time after school", [1, 2, 3, 4, 5]
            )

        st.subheader("Lifestyle and Other Information")

        c7, c8, c9 = st.columns(3)

        with c7:
            goout = st.selectbox(
                "Going out with friends", [1, 2, 3, 4, 5]
            )
            Dalc = st.selectbox(
                "Workday alcohol consumption scale", [1, 2, 3, 4, 5]
            )
            Walc = st.selectbox(
                "Weekend alcohol consumption scale", [1, 2, 3, 4, 5]
            )

        with c8:
            health = st.selectbox(
                "Health scale", [1, 2, 3, 4, 5]
            )
            famsup = st.selectbox(
                "Family educational support", ["yes", "no"]
            )
            paid = st.selectbox(
                "Extra paid classes", ["yes", "no"]
            )
            activities = st.selectbox(
                "Extracurricular activities", ["yes", "no"]
            )

        with c9:
            nursery = st.selectbox(
                "Attended nursery school", ["yes", "no"]
            )
            higher = st.selectbox(
                "Wants higher education", ["yes", "no"]
            )
            internet = st.selectbox(
                "Internet access at home", ["yes", "no"]
            )
            romantic = st.selectbox(
                "In a romantic relationship", ["yes", "no"]
            )

        predict_button = st.form_submit_button(
            "Predict Final Grade",
            type="primary",
            use_container_width=True
        )

    if predict_button:

        # Create one input row.
        input_data = {
            "school": school,
            "sex": sex,
            "age": age,
            "address": address,
            "famsize": famsize,
            "Pstatus": Pstatus,
            "Medu": Medu,
            "Fedu": Fedu,
            "Mjob": Mjob,
            "Fjob": Fjob,
            "reason": reason,
            "guardian": guardian,
            "traveltime": traveltime,
            "studytime": studytime,
            "failures": failures,
            "schoolsup": schoolsup,
            "famsup": famsup,
            "paid": paid,
            "activities": activities,
            "nursery": nursery,
            "higher": higher,
            "internet": internet,
            "romantic": romantic,
            "famrel": famrel,
            "freetime": freetime,
            "goout": goout,
            "Dalc": Dalc,
            "Walc": Walc,
            "health": health,
            "absences": absences,
            "G1": G1,
            "G2": G2
        }

        input_df = pd.DataFrame([input_data])

        # Apply the same feature engineering as training.
        input_df["Academic_Momentum"] = (
            input_df["G2"] - input_df["G1"]
        )

        input_df["Effort_Absence_Ratio"] = (
            input_df["studytime"] / (input_df["absences"] + 1)
        )

        # Match the exact feature order used during training.
        input_df = input_df.reindex(
            columns=feature_columns
        )

        try:
            prediction = float(model.predict(input_df)[0])
            prediction = max(0.0, min(20.0, prediction))

            st.divider()
            st.subheader("Prediction Result")

            st.metric(
                "Estimated Final Grade (G3)",
                f"{prediction:.2f} / 20"
            )

            st.progress(
                float(min(1.0, max(0.0, prediction / 20.0)))
            )

            if prediction >= 16:
                st.success(
                    "The model estimates a high final grade."
                )
            elif prediction >= 10:
                st.info(
                    "The model estimates a middle-range final grade."
                )
            else:
                st.warning(
                    "The model estimates a lower final grade. "
                    "Additional academic support may be helpful."
                )

            st.caption(
                "This is a model-generated estimate, not a "
                "guaranteed result or a judgment of the student's ability."
            )

        except Exception as error:
            st.error(f"Prediction failed: {error}")


# --------------------------------------------------
# 10. Model comparison page
# --------------------------------------------------

elif page == "Model Comparison":

    st.markdown(
        '<div class="section-title">Model Performance Comparison</div>',
        unsafe_allow_html=True
    )

    if COMPARISON_PATH.exists():

        results = pd.read_csv(COMPARISON_PATH)

        st.dataframe(
            results,
            use_container_width=True,
            hide_index=True
        )

        st.subheader("Mean Absolute Error (MAE)")
        st.bar_chart(
            results.set_index("Model")["MAE"]
        )

        st.subheader("R² Score")
        st.bar_chart(
            results.set_index("Model")["R2"]
        )

        st.caption(
            "Lower MAE is better. R² closer to 1 indicates "
            "a better fit on the evaluation data."
        )

    else:
        st.warning(
            "Model comparison file not found. "
            "Run the training script again."
        )


# --------------------------------------------------
# 11. Dataset explorer page
# --------------------------------------------------

elif page == "Dataset Explorer":

    st.markdown(
        '<div class="section-title">Dataset Explorer</div>',
        unsafe_allow_html=True
    )

    available_datasets = {}
    if DATA_PATH.exists():
        available_datasets["Training Dataset (training.csv)"] = str(DATA_PATH)
    if CHALLENGE_PATH.exists():
        available_datasets["Challenge Holdout Dataset (surprise_challenge.csv)"] = str(CHALLENGE_PATH)

    if not available_datasets:
        st.warning("No datasets found in the data/ folder.")
    else:
        selected_ds_label = st.selectbox(
            "Select Dataset to Explore",
            list(available_datasets.keys())
        )
        selected_path_str = available_datasets[selected_ds_label]

        try:
            df = load_dataset(selected_path_str)

            if df is None or df.empty:
                st.warning("Selected dataset is empty or unreadable.")
            else:
                c1, c2, c3 = st.columns(3)

                with c1:
                    st.metric("Rows", df.shape[0])

                with c2:
                    st.metric("Columns", df.shape[1])

                with c3:
                    st.metric(
                        "Missing Values",
                        int(df.isna().sum().sum())
                    )

                st.subheader("Dataset Preview")
                st.dataframe(
                    df.head(100),
                    use_container_width=True
                )

                st.subheader("Column Information")

                info_df = pd.DataFrame({
                    "Column": df.columns,
                    "Data Type": [
                        str(dtype) for dtype in df.dtypes
                    ],
                    "Missing Values": [
                        int(value) for value in df.isna().sum()
                    ]
                })

                st.dataframe(
                    info_df,
                    use_container_width=True,
                    hide_index=True
                )

                if "G3" in df.columns:
                    st.subheader("Final Grade Distribution (G3)")
                    st.bar_chart(
                        df["G3"].value_counts().sort_index()
                    )

        except Exception as error:
            st.error(f"Could not read the dataset: {error}")


# --------------------------------------------------
# 12. About page
# --------------------------------------------------

elif page == "About Project":

    st.markdown(
        '<div class="section-title">About ZENITH</div>',
        unsafe_allow_html=True
    )

    st.write(
        """
        ZENITH is a student performance prediction project
        developed using Python and machine learning.
        """
    )

    st.subheader("Technologies Used")

    st.markdown(
        """
        - **Python:** Main programming language
        - **Pandas:** Dataset loading and manipulation
        - **Scikit-learn:** Preprocessing, training and prediction
        - **Joblib:** Saving and loading trained model artifacts
        - **Streamlit:** Interactive web interface
        """
    )

    st.subheader("Machine Learning Workflow")

    st.markdown(
        """
        Dataset → Feature Engineering → Preprocessing →
        Model Training → Evaluation → Grade Prediction
        """
    )

    st.warning(
        "The prediction is an estimate based on patterns in the "
        "training data. It should not be used as the sole basis "
        "for academic decisions."
    )


# --------------------------------------------------
# 13. Footer
# --------------------------------------------------

st.divider()

st.caption(
    "ZENITH | Student Performance Prediction | "
    "Built with Python, Scikit-learn and Streamlit"
)

