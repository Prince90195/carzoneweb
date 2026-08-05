# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Run the backend API

1. Open a terminal and change into the backend folder:

```bash
cd carzone/backend
```

2. Create and activate the virtual environment (if not already created):

```bash
python3 -m venv venv
source venv/bin/activate
```

3. Install the backend dependencies:

```bash
pip install -r requirements.txt
```

4. Start the FastAPI server with Uvicorn:

```bash
./venv/bin/uvicorn main:app --reload
```

5. Open the API in your browser or use an API client:

```text
http://127.0.0.1:8000
```

Alternatively, from the project root you can start the backend with:

```bash
cd carzone
./backend/venv/bin/uvicorn backend.main:app --reload
```


