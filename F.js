// Classe de erro personalizada para validação de dados
export class F extends Error { //ZodError
  constructor(issues = []) {
    super();
    this.name = "ZodError";
    this.issues = issues;

    // Métodos utilitários para adicionar erros
    this.addIssue = (issue) => {
      this.issues = [...this.issues, issue];
    };
    this.addIssues = (issues = []) => {
      this.issues = [...this.issues, ...issues];
    };

    // Corrige o protótipo para herança adequada
    const proto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, proto);
    } else {
      this.__proto__ = proto;
    }
  }

  // Retorna todos os erros
  get errors() {
    return this.issues;
  }

  // Formata os erros em uma estrutura aninhada
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

  // Garante que o erro é uma instância de ZodError
  static assert(error) {
    if (!(error instanceof ZodError)) throw Error(`Not a ZodError: ${error}`);
  }

  // Retorna a mensagem do erro como string
  toString() {
    return this.message;
  }

  // Serializa os erros em JSON
  get message() {
    return JSON.stringify(this.issues, y.jsonStringifyReplacer, 2);
  }

  // Verifica se não há erros
  get isEmpty() {
    return this.issues.length === 0;
  }

  // Retorna erros em formato simplificado para formulários
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

  // Atalho para erros de formulário
  get formErrors() {
    return this.flatten();
  }
}