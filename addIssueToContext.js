/**
 * Adds an issue to the Zod validation context.
 * @param {object} e - The validation context.
 * @param {object} t - The issue data.
 */
export function addIssueToContext(e, t) {
    let n = q(), // getErrorMap()
        r = H({ // makeIssue()
            issueData: t,
            data: e.data,
            path: e.path,
            errorMaps: [
                e.common.contextualErrorMap,
                e.schemaErrorMap,
                n,
                n === U ? void 0 : U, // defaultErrorMap
            ].filter((e) => !!e),
        });
    e.common.issues.push(r);
}