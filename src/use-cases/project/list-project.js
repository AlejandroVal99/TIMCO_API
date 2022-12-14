export default function makeListProject({ projectDb, stateModel }) {
  return async function listProject({ projectId } = {}) {
    if (!projectId) throw new Error('project id null');

    const existing = await projectDb.findById(projectId, stateModel);
    if (!existing) {
      throw new Error(`project with id=${projectId} does not exist`);
    }

    return existing;
  };
}
