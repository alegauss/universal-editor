// Custom error class for data validation.
export class ZodError extends Error { 
  constructor(issues = []) {
    super();
    this.name = "ZodError";
    this.issues = issues;

    // Utility methods to add errors
    this.addIssue = (issue) => {
      this.issues = [...this.issues, issue];
    };
    this.addIssues = (issues = []) => {
      this.issues = [...this.issues, ...issues];
    };

    // Fix the prototype for proper inheritance
    const proto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, proto);
    } else {
      this.__proto__ = proto;
    }
  }

  // Returns all errors
  get errors() {
    return this.issues;
  }

  // Formats errors into a nested structure
  format(mapper) {
    const mapFn = mapper || ((issue) => issue.message);
    const formatted = { _errors: [] };

    const process = (errorObj) => {
      for (const issue of errorObj.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.forEach(process);
        } else if (issue.code === "invalid_return_type") {
          process(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          process(issue.argumentsError);
        } else if (issue.path.length === 0) {
          formatted._errors.push(mapFn(issue));
        } else {
          let curr = formatted;
          for (let i = 0; i < issue.path.length; i++) {
            const key = issue.path[i];
            if (i === issue.path.length - 1) {
              curr[key] = curr[key] || { _errors: [] };
              curr[key]._errors.push(mapFn(issue));
            } else {
              curr[key] = curr[key] || { _errors: [] };
              curr = curr[key];
            }
          }
        }
      }
    };

    process(this);
    return formatted;
  }

  // Ensures that the error is an instance of ZodError
  static assert(error) {
    if (!(error instanceof ZodError)) throw Error(`Not a ZodError: ${error}`);
  }

  // Returns the error message as a string
  toString() {
    return this.message;
  }

  // Serializes errors to JSON
  get message() {
    return JSON.stringify(this.issues, y.jsonStringifyReplacer, 2);
  }

  // Checks if there are no errors
  get isEmpty() {
    return this.issues.length === 0;
  }

  // Returns errors in a simplified format for forms
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const issue of this.issues) {
      if (issue.path.length > 0) {
        const key = issue.path[0];
        fieldErrors[key] = fieldErrors[key] || [];
        fieldErrors[key].push(mapper(issue));
      } else {
        formErrors.push(mapper(issue));
      }
    }
    return { formErrors, fieldErrors };
  }

  // Shortcut for form errors
  get formErrors() {
    return this.flatten();
  }
}