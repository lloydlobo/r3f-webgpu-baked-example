# React Three Fiber - WebGPU Starter for Blender GLTF/GLB models

```shell
npm install
npm run dev
```

![screenshot_2025-11-30T17:17:26.000Z.png]

> Learn more about WebGPU and how to use it with Three.js and React Three Fiber with [React Three Fiber: The Ultimate Guide to 3D Web Development](https://wawasensei.dev/courses/react-three-fiber)

## Deploy to github pages

- Build

  ```shell
  npm run build
  ```

- Make the urls absolute in dist/index.html

  ```diff
  - <script type="module" crossorigin src="/assets/index-W-tG0_Dv.js"></script>
  - <link rel="stylesheet" crossorigin href="/assets/index-CYx8u_nq.css" />

  + <script type="module" crossorigin src="assets/index-W-tG0_Dv.js"></script>
  + <link rel="stylesheet" crossorigin href="assets/index-CYx8u_nq.css" />
  ```

- Deploy using gh-pages

  ```shell
  npm run deploy
  ```

---

<!-- links -->

[screenshot_2025-11-30T17:17:26.000Z.png]: static/screenshot_2025-11-30T17:17:26.000Z.png
