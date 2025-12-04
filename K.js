export  function K(e, t) {
    let n = q(),
      r = H({
        issueData: t,
        data: e.data,
        path: e.path,
        errorMaps: [
          e.common.contextualErrorMap,
          e.schemaErrorMap,
          n,
          n === U ? void 0 : U,
        ].filter((e) => !!e),
      });
    e.common.issues.push(r);
  }