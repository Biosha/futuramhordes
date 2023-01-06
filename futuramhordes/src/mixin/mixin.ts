export const mixin = {
  methods: {
    getImgURL(path: string, imgName: string): URL {
      return new URL(`/src/assets/${path}/${imgName}.webp`, import.meta.url);
    },
  },
};
