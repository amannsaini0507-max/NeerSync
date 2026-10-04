# Makefile for NeerSync Simulation & AI/ML Engine

.PHONY: setup test demo serve evaluate clean

setup:
	python -m pip install --upgrade pip
	pip install -r simulation/requirements.txt

test:
	pytest simulation/tests -v

demo:
	streamlit run simulation/demo.py

serve:
	uvicorn simulation.api:app --host 0.0.0.0 --port 8000 --reload

evaluate:
	python simulation/evaluate.py

clean:
	rm -rf simulation/__pycache__ simulation/*/__pycache__ .pytest_cache
