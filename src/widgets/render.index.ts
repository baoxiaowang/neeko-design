// const modules = import.meta.globEager('./*/editor.(vue|ts|js)',{})
const modulesRender = import.meta.globEager(
  './components/*/render.(vue|ts|js)'
);

const render: Record<
  string,
  {
    [key: string]: any;
  }
> = {};

if (modulesRender) {
  const keys = Object.keys(modulesRender);
  keys.forEach((path) => {
    if (Object.prototype.hasOwnProperty.call(modulesRender, path)) {
      const name = path.split('/')[2];
      render[name] = modulesRender[path].default;
    }
  });
}

export default render;
