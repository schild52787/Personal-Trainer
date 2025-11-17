# LLM-Tax-Abuse Installation Guide

## Overview
This repository contains code and data from the research paper "Can LLMs Identify Tax Abuse?" investigating whether large language models can identify and generate tax strategies.

## Prerequisites
- Git
- Conda (Anaconda or Miniconda)
- API keys for at least one LLM provider (OpenAI, Anthropic, or Google AI)

## Installation Steps

### 1. Clone the Repository
```bash
cd /home/user
git clone https://github.com/BlairStanek/LLM-Tax-Abuse.git
cd LLM-Tax-Abuse
```

### 2. Create Conda Environment
The project uses Python 3.12.3 with specific dependencies defined in `environment.yml`.

```bash
# Create the conda environment from the environment.yml file
conda env create -f environment.yml

# Activate the environment
conda activate llm-tax-abuse
```

**Note:** If the environment name in `environment.yml` is different, check with:
```bash
conda env list
```

### 3. Configure API Keys
The project requires API access to LLM providers. Create a `.env` file in the project root:

```bash
# In the LLM-Tax-Abuse directory
touch .env
```

Edit the `.env` file and add your API keys:
```
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
```

**Where to get API keys:**
- OpenAI: https://platform.openai.com/api-keys
- Anthropic: https://console.anthropic.com/
- Google AI: https://makersuite.google.com/app/apikey

### 4. Verify Installation
```bash
# Ensure the environment is activated
conda activate llm-tax-abuse

# Test Python version
python --version  # Should show Python 3.12.3

# Test key imports
python -c "import anthropic, openai, pandas, pdfplumber; print('All key packages imported successfully')"
```

## Project Structure
- `Strategies/` - Contains 5 example U.S. tax-minimization strategies
- `Novel_Tax_Strategy_17.pdf` - LLM-generated novel tax strategy
- Python scripts for various evaluation tasks (see Usage section)

## Usage

### Important Notes
- **All API calls use batch APIs**, requiring sequential execution of Python scripts
- You must track batch identifiers from API provider consoles between steps
- Monitor batch status at provider platforms (e.g., https://platform.openai.com/batches for OpenAI)

### Available Tasks

#### Analysis Verification
```bash
python analysis_verification.py
# Wait for batch to complete, note batch ID
python binary_answers_clarify.py
# Wait for batch to complete
python binary_answers_finalize.py
```

#### Goal Verification
```bash
python goal_verification.py
# Wait for batch to complete, note batch ID
python binary_answers_clarify.py
# Wait for batch to complete
python binary_answers_finalize.py
```

#### Step-Cloze Task
```bash
python step_cloze_start.py
# Wait for batch to complete, note batch ID
python step_cloze_grade.py
# Wait for batch to complete
python step_cloze_finalize.py
```

#### Freeform Strategy Generation
```bash
python generate_freeform.py
# Wait for batch to complete, note batch ID
python generate_freeform_retrieve.py
```

## Troubleshooting

### Conda Environment Creation Fails
If you encounter issues creating the environment:
```bash
# Try updating conda first
conda update conda

# Or create environment manually with Python 3.12
conda create -n llm-tax-abuse python=3.12
conda activate llm-tax-abuse
pip install anthropic openai google-generativeai pandas pdfplumber python-dotenv
```

### API Key Issues
- Ensure your `.env` file is in the root directory of the project
- Verify API keys are active and have sufficient credits/quota
- Check that keys have batch API access enabled

### Batch API Not Completing
- Monitor batch status through provider web consoles
- Batch operations can take time depending on queue
- Ensure you're passing correct batch IDs between script executions

## Research Context
This project investigates LLM capabilities in tax strategy identification and generation. The research produced what is believed to be the first LLM-generated novel tax strategy, detailed in `Novel_Tax_Strategy_17.pdf`.

**Note:** Only 5 of 36 expert-created strategy files are publicly available to prevent LLM training contamination.

## Support
For issues with the repository, visit: https://github.com/BlairStanek/LLM-Tax-Abuse/issues
