// Classe base para validação e transformação de dados
export class ae { //SchemaBase
  constructor(definition) {
    this._def = definition;

    // Bind de métodos para garantir o contexto correto
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);

    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);

    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);

    this.or = this.or.bind(this);
    this.and = this.and.bind(this);

    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);

    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
  }

  // Retorna a descrição do schema
  get description() {
    return this._def.description;
  }

  // Obtém o tipo do dado
  _getType(ctx) {
    return B(ctx.data);
  }

  // Retorna o contexto ou cria um novo se não existir
  _getOrReturnCtx(ctx, maybeCtx) {
    return (
      maybeCtx || {
        common: ctx.parent.common,
        data: ctx.data,
        parsedType: B(ctx.data),
        schemaErrorMap: this._def.errorMap,
        path: ctx.path,
        parent: ctx.parent,
      }
    );
  }

  // Processa os parâmetros de entrada
  _processInputParams(ctx) {
    return {
      status: new W(),
      ctx: {
        common: ctx.parent.common,
        data: ctx.data,
        parsedType: B(ctx.data),
        schemaErrorMap: this._def.errorMap,
        path: ctx.path,
        parent: ctx.parent,
      },
    };
  }

  // Métodos de validação síncrona e assíncrona
  _parseSync(ctx) {
    const result = this._parse(ctx);
    if (te(result)) throw Error("Synchronous parse encountered promise.");
    return result;
  }

  _parseAsync(ctx) {
    return Promise.resolve(this._parse(ctx));
  }

  // Validação síncrona
  parse(data, options) {
    const result = this.safeParse(data, options);
    if (result.success) return result.data;
    throw result.error;
  }

  // Validação segura síncrona
  safeParse(data, options) {
    let asyncFlag = options?.async ?? false;
    let ctx = {
      common: {
        issues: [],
        async: asyncFlag,
        contextualErrorMap: options?.errorMap,
      },
      path: options?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: B(data),
    };
    const parsed = this._parseSync({ data, path: ctx.path, parent: ctx });
    return ie(ctx, parsed);
  }

  // Validação assíncrona
  async parseAsync(data, options) {
    const result = await this.safeParseAsync(data, options);
    if (result.success) return result.data;
    throw result.error;
  }

  // Validação segura assíncrona
  async safeParseAsync(data, options) {
    let ctx = {
      common: {
        issues: [],
        contextualErrorMap: options?.errorMap,
        async: true,
      },
      path: options?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: B(data),
    };
    const parsed = this._parse({ data, path: ctx.path, parent: ctx });
    return ie(ctx, await (te(parsed) ? parsed : Promise.resolve(parsed)));
  }

  // Métodos de refinamento e transformação
  refine(check, message) {
    const getMessage = (val) =>
      typeof message === "string" || message === undefined
        ? { message }
        : typeof message === "function"
        ? message(val)
        : message;

    return this._refinement((val, ctx) => {
      const result = check(val);
      const addIssue = () => ctx.addIssue({ code: j.custom, ...getMessage(val) });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((ok) => !!ok || (addIssue(), false));
      }
      return !!result || (addIssue(), false);
    });
  }

  refinement(check, message) {
    return this._refinement(
      (val, ctx) => !!check(val) || (ctx.addIssue(typeof message === "function" ? message(val, ctx) : message), false)
    );
  }

  _refinement(refinementFn) {
    return new Ye({
      schema: this,
      typeName: S.ZodEffects,
      effect: { type: "refinement", refinement: refinementFn },
    });
  }

  superRefine(fn) {
    return this._refinement(fn);
  }

  // Métodos utilitários para composição de schemas
  optional() {
    return Xe.create(this, this._def);
  }
  nullable() {
    return Qe.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return $e.create(this, this._def);
  }
  promise() {
    return Ge.create(this, this._def);
  }
  or(other) {
    return ze.create([this, other], this._def);
  }
  and(other) {
    return Le.create(this, other, this._def);
  }
  transform(transformFn) {
    return new Ye({
      ...se(this._def),
      schema: this,
      typeName: S.ZodEffects,
      effect: { type: "transform", transform: transformFn },
    });
  }
  default(defaultValue) {
    return new et({
      ...se(this._def),
      innerType: this,
      defaultValue: typeof defaultValue === "function" ? defaultValue : () => defaultValue,
      typeName: S.ZodDefault,
    });
  }
  brand() {
    return new ot({ typeName: S.ZodBranded, type: this, ...se(this._def) });
  }
  catch(catchValue) {
    return new tt({
      ...se(this._def),
      innerType: this,
      catchValue: typeof catchValue === "function" ? catchValue : () => catchValue,
      typeName: S.ZodCatch,
    });
  }
  describe(description) {
    return new this.constructor({ ...this._def, description });
  }
  pipe(pipeSchema) {
    return it.create(this, pipeSchema);
  }
  readonly() {
    return st.create(this);
  }

  // Métodos para checar se o schema aceita undefined ou null
  isOptional() {
    return this.safeParse(undefined).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}