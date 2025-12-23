import { defineConfig } from 'eslint/config'
import react from './react.js'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

export default defineConfig([...react, ...nextVitals, ...nextTs])
