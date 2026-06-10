
export default [
  {
    test: {
      name: 'node-tests',
      environment: 'node',
      include: ["./packages/"],
    },
  },
  {
    test: {
      name: 'dom-tests',
      environment: 'happy-dom',
      include: ["./apps/frontend/"],
    },
  },
]
