"""
JalSetu Cross-Platform Simulation CLI Runner
Provides equivalent functionality to Makefile on Windows, Linux, and macOS.

Usage:
    python simulation/run.py setup
    python simulation/run.py test
    python simulation/run.py demo
    python simulation/run.py serve
    python simulation/run.py evaluate
"""

import sys
import subprocess
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent


def run_cmd(cmd: list):
    print(f">> Running: {' '.join(cmd)}")
    result = subprocess.run(cmd, cwd=REPO_ROOT)
    if result.returncode != 0:
        sys.exit(result.returncode)


def main():
    if len(sys.argv) < 2:
        print("Usage: python simulation/run.py [setup | test | demo | serve | evaluate]")
        sys.exit(1)

    action = sys.argv[1].lower()

    if action == "setup":
        run_cmd([sys.executable, "-m", "pip", "install", "--upgrade", "pip"])
        run_cmd([sys.executable, "-m", "pip", "install", "-r", "simulation/requirements.txt"])
    elif action == "test":
        run_cmd([sys.executable, "-m", "pytest", "simulation/tests", "-v"])
    elif action == "demo":
        run_cmd([sys.executable, "-m", "streamlit", "run", "simulation/demo.py"])
    elif action == "serve":
        run_cmd([sys.executable, "-m", "uvicorn", "simulation.api:app", "--host", "0.0.0.0", "--port", "8000", "--reload"])
    elif action == "evaluate":
        run_cmd([sys.executable, "simulation/evaluate.py"])
    else:
        print(f"Unknown action: '{action}'. Choose from: setup, test, demo, serve, evaluate")
        sys.exit(1)


if __name__ == "__main__":
    main()
