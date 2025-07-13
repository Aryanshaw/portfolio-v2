const fileSystem = {
  '/': {
    type: 'directory',
    name: '/',
    children: {
      about: {
        type: 'file',
        name: 'about.txt',
        content: 'Hi, I’m Aryan...',
      },
      projects: {
        type: 'directory',
        name: 'projects',
        children: {
          spark: {
            type: 'file',
            name: 'spark.txt',
            content: 'Dating App using ChatGPT + Redis + Postgres',
          },
          atrean: {
            type: 'file',
            name: 'atrean.txt',
            content: 'Data-to-AI decision intelligence system',
          },
        },
      },
      contact: {
        type: 'file',
        name: 'contact.txt',
        content: 'Email: aryan@xyz.com\nLinkedIn: linkedin.com/in/aryanshaw',
      },
    },
  },
};

function resolveNode(fs: any, cwdArray: string[]) {
  let node = fs['/'];
  for (const dir of cwdArray.slice(1)) {
    node = node.children?.[dir];
    if (!node) return node;
  }
  return node;
}

export { fileSystem, resolveNode };
