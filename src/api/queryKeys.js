export const postQueryKeys = {
  all: ["posts"],
  detail: (id) => ["posts", Number(id)]
};
