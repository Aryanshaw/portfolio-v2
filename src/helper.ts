const fileSystem = {
  '/': {
    type: 'directory',
    children: {
      about: {
        type: 'file',
        content: 'Hi, I’m Aryan...',
      },
      projects: {
        type: 'directory',
        children: {
          spark: { type: 'file', content: 'Dating App using ChatGPT + Redis + Postgres' },
          atrean: { type: 'file', content: 'Data-to-AI decision intelligence system' },
        },
      },
      contact: {
        type: 'file',
        content: 'Email: aryan@xyz.com\nLinkedIn: linkedin.com/in/aryanshaw',
      },
    },
  },
};

function resolveNode(fs: any, cwdArray: string[]) {
  let node = fs['/'];
  for (const dir of cwdArray.slice(1)) {
    node = node.children?.[dir];
    if (!node || node.type !== 'directory') return null;
  }
  return node;
}

export { fileSystem, resolveNode };
