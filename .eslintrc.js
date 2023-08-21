/**
 * See the the detailed configuration method refer on the following website:
 *   En: https://eslint.org/docs/user-guide/configuring
 *   Zh: https://cn.eslint.org/docs/user-guide/configuring
 */

module.exports = {
	/**
	 * 标记当前目录为 eslint 的根目录
	 * 否则会继续向上寻找至项目根目录（或发生意想不到的情况）
	 */
	root: true,
	/**
	 * 定义每种环境下统一的全局变量
	 * 这些环境并不是互斥的，所以可以同时定义多个
	 * https://cn.eslint.org/docs/user-guide/configuring#specifying-environments
	 */
	env: {
		browser: true,
		node: true,
		// 启用 ES6 全局变量
		es6: true,
	},
	/**
	 * 定义特有的全局变量，比如：node.process window.console $ jquery 等
	 *   writable: 该变量可读写，等同于 true 和 writeable
	 *   readonly: 该变量是只读，等同于 false 和 readable
	 *   off: 该变量被禁用，比如: Promise: 'off'
	 */
	globals: {
		pub: false,
		core: false,
		browser: 'readonly',
		LOG: false,
		KEYMAP: false,
		mod: false,
	},
	/**
	 * 扩展现有的 ESLint 规范
	 *   可以使用以下几种类型的扩展：(以下名称开个头的)
	 *     `eslint:xxx` ESLint 的官方扩展。比如: `eslint:recommended`
	 *     `plugin:xxx` 插件类型扩展。比如: `plugin:vue/recommended`
	 *     `eslint-config:xxx` 来自 npm 包。使用时可以省略 `eslint-config-`，比如 `eslint-config-standard` 可以直接写成 `standard`
	 *     `@:xxx` 和 eslint-config 一样，是在 npm 包上面加了一层作用域scope。比如: `@vue/prettier`
	 * 需要注意的是：多个扩展中有相同的规则，以 `后面引入的扩展` 中规则为准。
	 */
	extends: [
		/**
		 * ESLint 官方的插件
		 *   eslint:all: 所有规范
		 *   eslint:recommended: 推荐规范。即带 `绿色√` 的
		 */
		'eslint:recommended',
		/**
		 * npm i eslint-plugin-vue -D
		 * See: https://eslint.vuejs.org/rules/
		 *   plugin:vue/base: 基础的
		 *   plugin:vue/essential: 必不可少的
		 *   plugin:vue/recommended: 推荐的
		 *   plugin:vue/strongly-recommended: 强烈推荐的
		 */
		'plugin:vue/recommended',
		/**
		 * 推荐几个比较知名的编码规范:
		 *   AirBnB: github 上 Star 最多
		 *   Prettier: 可一键改变代码风格，无需强制改变开发风格
		 *   Standard: 无分号，不支持修改规则，并且还需要安装以下插件配合使用才会生效
		 *      npm i eslint-config-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node -D
		 *   Google: 谷歌工程师的编码风格
		 */
		// 'eslint-config-standard',
	],
	/**
	 * 可以额外支持 vue、react 等库的语法检测，因为官方的规则只能检查标准的 JS 语法
	 * 如果插件以 `eslint-plugin-` 开头，使用时可以省略。比如 eslint-plugin-vue
	 */
	plugins: [
		// eslint-plugin-vue 插件依赖 vue-eslint-parser 解析器
		'vue',
	],
	/**
	 * 指定要使用的解析器（最外层只能有一个 parser 解析器）
	 * esprima: ESLint 最开始使用的解析器
	 * espree: 默认，ESLint 自己基于 esprima v1.2.2 开发的一个解析器
	 * babel-eslint: 一个对 Babel 解析器的包装，使其能够与 ESLint 兼容。可以使用一些先进的语法，比如ES6789
	 * @typescript-eslint/parser: 将 TypeScript 转换成与 estree 兼容的形式，以便在 ESLint 中使用。
	 */
	parser: 'vue-eslint-parser',
	/**
	 * 解析器所需的选项参数
	 */
	parserOptions: {
		/**
		 * 指定一下解析器
		 * 比如 vue-eslint-parser 解析器只会解析 template 内容，不会检测 script 标签中的 js 内容
		 */
		parser: 'babel-eslint',
		// 代码模块类型，可选: script(default) 和 module
		sourceType: 'module',
		// es版本号，启用 ESx 语法。默认为5，可以使用年份2015（同6）。latest: 最新
		ecamVersion: 10,
		// es 特性配置，想使用哪些附加语言功能
		ecmaFeatures: {
			// globalReturn: true, // 允许在全局作用域下使用 return 语句
			// impliedStrict: true, // 启用全局 strict mode
			// jsx: true, // 启用 JSX
		},
		allowImportExportEverywhere: true,
	},
	/**
	 * 可配置额外的自定义格式化规则，也可以覆写 extends 和 plugins 中的规则
	 * See: https://cn.eslint.org/docs/rules/
	 *   规则名称前的图标：
	 *     ✅  包含在 `eslint:recommended` 扩展中的推荐规则
	 *     🔧  使用 `eslint --fix` 会自动修复的规则
	 *   对于检验规则，有3个报错等级:
	 *     0 || 'off': 关闭规则
	 *     1 || 'warn': 开启规则，warn级别的错误 (不会导致程序退出)
	 *     2 || 'error': 开启规则，error级别的错误(当被触发的时候，程序会退出)
	 */
	rules: {
		/**
		 * ✅ 禁用 debugger
		 */
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		/**
		 * 在 <template> 中强制使用一致的缩进
		 * https://eslint.vuejs.org/rules/html-indent.html
		 */
		'vue/html-indent': ['error', 'tab', {
			'attribute': 1,
			'baseIndent': 1,
			'closeBracket': 0,
			'alignAttributesVertically': true,
			'ignores': []
		}],
		/**
		 * 🔧 强制 js 中使用一致的缩进
		 * https://cn.eslint.org/docs/rules/indent
		 *   tab: 使用 tab 缩进 ( 需在 VSCode 中自行设置 1 tab === ? spaces )
		 *   2 || 4: 使用 spaces 缩进
		 * PS: 好像大家用 4 spaces 更多呢 ~
		 */
		indent: [2, 'tab', {
			// switch 语句的 case 缩进级别。1: 2个空格
			SwitchCase: 1,
		}],
		/**
		 * 强制每行的最大属性数
		 * https://eslint.vuejs.org/rules/max-attributes-per-line.html
		 */
		'vue/max-attributes-per-line': [2, {
			singleline: 10,
			multiline: {
				max: 1,
				// allowFirstLine: false,
			}
		}],
		/**
		 * 强制组件中的属性顺序
		 * https://eslint.vuejs.org/rules/order-in-components.html
		 */
		'vue/order-in-components': ['error', {
			'order': [
				'el',
				'name',
				'key',
				'parent',
				'functional',
				['delimiters', 'comments'],
				['components', 'directives', 'filters'],
				'extends',
				'mixins',
				['provide', 'inject'],
				'ROUTER_GUARDS',
				'layout',
				'middleware',
				'validate',
				'scrollToTop',
				'transition',
				'loading',
				'inheritAttrs',
				'model',
				['props', 'propsData'],
				'emits',
				'setup',
				'asyncData',
				'data',
				'fetch',
				'head',
				'computed',
				'watch',
				'watchQuery',
				'LIFECYCLE_HOOKS',
				'methods',
				['template', 'render'],
				'renderError'
			]
		}],
		/**
		 * 🔧 要求使用 === 和 !==
		 * https://cn.eslint.org/docs/rules/eqeqeq
		 */
		eqeqeq: [1, 'allow-null'],
		/**
		 * 为组件定义名称大小写定义样式
		 * https://eslint.vuejs.org/rules/component-definition-name-casing.html
		 */
		'vue/component-definition-name-casing': ['error', 'PascalCase'],
		/**
		 * 为事件定义名称需要使用横线格式
		 * https://eslint.vuejs.org/rules/custom-event-name-casing.html
		 */
		'vue/custom-event-name-casing': 1,
		/**
		 * 为修改store必须用mutation
		 */
		'vue/no-mutating-props': 1,
		/**
		 * 强制 getter 和 setter 在对象中成对出现
		 */
		'accessor-pairs': 2,
		/**
		 * 🔧 强制箭头函数的箭头前后使用一致的空格
		 */
		'arrow-spacing': [2, {
			before: true,
			after: true,
		}],
		/**
		 * 🔧 禁止或强制在代码块中开括号前和闭括号后有空格
		 */
		'block-spacing': [2, 'always'],
		/**
		 * 🔧 强制在代码块中使用一致的大括号风格
		 */
		'brace-style': [2, '1tbs', {
			allowSingleLine: true,
		}],
		/**
		 * 强制使用骆驼拼写法命名约定
		 */
		camelcase: [0, {
			properties: 'always',
		}],
		/**
		 * 🔧 要求或禁止末尾逗号
		 */
		'comma-dangle': [2, {
			arrays: 'ignore',
			objects: 'ignore',
			imports: 'never',
			exports: 'never',
			functions: 'ignore',
		}],
		/**
		 * 🔧 强制在逗号前后使用一致的空格
		 */
		'comma-spacing': [2, {
			before: false,
			after: true,
		}],
		/**
		 * 🔧 强制使用一致的逗号风格
		 */
		'comma-style': [2, 'last'],
		/**
		 * ✅ 要求在构造函数中有 super() 的调用
		 */
		'constructor-super': 2,
		/**
		 * 🔧 强制所有控制语句使用一致的括号风格
		 */
		curly: [2, 'multi-line'],
		/**
		 * 🔧 强制在点号之前和之后一致的换行
		 */
		'dot-location': [2, 'property'],
		/**
		 * 🔧 要求或禁止文件末尾存在空行
		 */
		'eol-last': 2,
		/**
		 * 🔧 强制 generator 函数中 * 号周围使用一致的空格
		 */
		'generator-star-spacing': [2, {
			before: true,
			after: true,
		}],
		/**
		 * 要求回调函数中有容错处理
		 */
		'handle-callback-err': [2, '^(err|error)$'],
		/**
		 * 🔧 强制在 JSX 属性中一致地使用双引号或单引号
		 */
		'jsx-quotes': [2, 'prefer-single'],
		/**
		 * 🔧 强制在对象字面量的属性中键和值之间使用一致的间距
		 * https://cn.eslint.org/docs/rules/key-spacing
		 */
		'key-spacing': [2, {
			// 禁止在对象字面量的键和冒号之间存在空格
			beforeColon: false,
			// 要求在对象字面量的冒号和值之间存在至少有一个空格
			afterColon: true,
		}],
		/**
		 * 🔧 强制在关键字前后使用一致的空格
		 * https://cn.eslint.org/docs/rules/keyword-spacing
		 */
		'keyword-spacing': [2, {
			before: true,
			after: true,
		}],
		/**
		 * 要求构造函数首字母大写
		 */
		'new-cap': [2, {
			newIsCap: true,
			capIsNew: false,
		}],
		/**
		 * 🔧 强制或禁止调用无参构造函数时有圆括号
		 */
		'new-parens': 2,
		/**
		 * 禁用 Array 构造函数
		 */
		'no-array-constructor': 2,
		/**
		 * 禁用 arguments.caller 或 arguments.callee
		 */
		'no-caller': 2,
		/**
		 * 禁用 console
		 */
		'no-console': 'off',
		/**
		 * ✅ 禁止修改类声明的变量
		 */
		'no-class-assign': 2,
		/**
		 * ✅ 禁止条件表达式中出现赋值操作符
		 */
		'no-cond-assign': 2,
		/**
		 * ✅ 禁止修改 const 声明的变量
		 */
		'no-const-assign': 2,
		/**
		 * ✅ 禁止在正则表达式中使用控制字符
		 * https://cn.eslint.org/docs/rules/no-control-regex
		 */
		'no-control-regex': 0,
		/**
		 * ✅ 禁止删除变量
		 */
		'no-delete-var': 2,
		/**
		 * ✅ 禁止 function 定义中出现重名参数
		 */
		'no-dupe-args': 2,
		/**
		 * ✅ 禁止类成员中出现重复的名称
		 */
		'no-dupe-class-members': 2,
		/**
		 * ✅ 禁止对象字面量中出现重复的 key
		 */
		'no-dupe-keys': 2,
		/**
		 * ✅ 禁止出现重复的 case 标签
		 */
		'no-duplicate-case': 2,
		/**
		 * ✅ 禁止在正则表达式中使用空字符集
		 */
		'no-empty-character-class': 2,
		/**
		 * ✅ 禁止使用空解构模式
		 */
		'no-empty-pattern': 2,
		/**
		 * 禁用 eval()
		 */
		'no-eval': 0,
		/**
		 * ✅ 禁止对 catch 子句的参数重新赋值
		 */
		'no-ex-assign': 2,
		/**
		 * 禁止扩展原生类型
		 */
		'no-extend-native': 2,
		/**
		 * 🔧 禁止不必要的 .bind() 调用
		 */
		'no-extra-bind': 2,
		/**
		 * ✅ 🔧 禁止不必要的布尔转换
		 */
		'no-extra-boolean-cast': 2,
		/**
		 * 🔧 禁止不必要的括号
		 */
		'no-extra-parens': [2, 'functions'],
		/**
		 * ✅ 禁止 case 语句落空
		 */
		'no-fallthrough': 2,
		/**
		 * 🔧 禁止数字字面量中使用前导和末尾小数点
		 */
		'no-floating-decimal': 2,
		/**
		 * ✅ 禁止对 function 声明重新赋值
		 */
		'no-func-assign': 2,
		/**
		 * 禁止使用类似 eval() 的方法
		 */
		'no-implied-eval': 2,
		/**
		 * ✅ 禁止在嵌套的块中出现变量声明或 function 声明
		 */
		'no-inner-declarations': [2, 'functions'],
		/**
		 * ✅ 禁止 RegExp 构造函数中存在无效的正则表达式字符串
		 */
		'no-invalid-regexp': 2,
		/**
		 * ✅ 禁止不规则的空白
		 */
		'no-irregular-whitespace': 2,
		/**
		 * 禁用 __iterator__ 属性
		 */
		'no-iterator': 2,
		/**
		 * 不允许标签与变量同名
		 */
		'no-label-var': 2,
		/**
		 * 禁用标签语句
		 */
		'no-labels': [2, {
			allowLoop: false,
			allowSwitch: false,
		}],
		/**
		 * 禁用不必要的嵌套块
		 */
		'no-lone-blocks': 2,
		/**
		 * ✅ 禁止空格和 tab 的混合缩进
		 */
		'no-mixed-spaces-and-tabs': 2,
		/**
		 * 🔧 禁止使用多个空格
		 */
		'no-multi-spaces': 2,
		/**
		 * 禁止使用多行字符串
		 */
		'no-multi-str': 2,
		/**
		 * 🔧 禁止出现多行空行
		 */
		'no-multiple-empty-lines': [2, {
			max: 1,
		}],
		/**
		 * ✅ 禁止对原生对象或只读的全局对象进行赋值
		 */
		'no-global-assign': 2,
		/**
		 * ✅ 🔧 禁止对关系运算符的左操作数使用否定操作符
		 */
		'no-unsafe-negation': 2,
		/**
		 * 禁用 Object 的构造函数
		 */
		'no-new-object': 2,
		/**
		 * 禁止调用 require 时使用 new 操作符
		 */
		'no-new-require': 2,
		/**
		 * ✅ 禁止 Symbolnew 操作符和 new 一起使用
		 */
		'no-new-symbol': 2,
		/**
		 * 禁止对 String，Number 和 Boolean 使用 new 操作符
		 */
		'no-new-wrappers': 2,
		/**
		 * ✅ 禁止把全局对象作为函数调用
		 */
		'no-obj-calls': 2,
		/**
		 * ✅ 禁用八进制字面量
		 */
		'no-octal': 2,
		/**
		 * 禁止在字符串中使用八进制转义序列
		 */
		'no-octal-escape': 2,
		/**
		 * 禁止对 __dirname 和 __filename 进行字符串连接
		 */
		'no-path-concat': 2,
		/**
		 * 禁用 __proto__ 属性
		 */
		'no-proto': 2,
		/**
		 * ✅ 禁止多次声明同一变量
		 */
		'no-redeclare': 2,
		/**
		 * ✅ 🔧 禁止正则表达式字面量中出现多个空格
		 */
		'no-regex-spaces': 2,
		/**
		 * 禁止在 return 语句中使用赋值语句
		 */
		'no-return-assign': [2, 'except-parens'],
		/**
		 * ✅ 禁止自我赋值
		 */
		'no-self-assign': 2,
		/**
		 * 禁止自身比较
		 */
		'no-self-compare': 2,
		/**
		 * 禁用逗号操作符
		 */
		'no-sequences': 2,
		/**
		 * ✅ 禁止将标识符定义为受限的名字
		 */
		'no-shadow-restricted-names': 2,
		/**
		 * ✅ 要求或禁止在函数标识符和其调用之间有空格
		 */
		'func-call-spacing': 2,
		/**
		 * ✅ 禁用稀疏数组
		 */
		'no-sparse-arrays': 2,
		/**
		 * ✅ 禁止在构造函数中，在调用 super() 之前使用 this 或 super
		 */
		'no-this-before-super': 2,
		/**
		 * 禁止抛出异常字面量
		 */
		'no-throw-literal': 2,
		/**
		 * 禁用行尾空格
		 */
		'no-trailing-spaces': 2,
		/**
		 * ✅ 禁用未声明的变量，除非它们在 global 注释中被提到
		 */
		'no-undef': 2,
		/**
		 * 🔧 禁止将变量初始化为 undefined
		 */
		'no-undef-init': 2,
		/**
		 * ✅ 禁止出现令人困惑的多行表达式
		 */
		'no-unexpected-multiline': 2,
		/**
		 * 禁用一成不变的循环条件
		 */
		'no-unmodified-loop-condition': 2,
		/**
		 * 🔧 禁止可以在有更简单的可替代的表达式时使用三元操作符
		 */
		'no-unneeded-ternary': [2, {
			defaultAssignment: false,
		}],
		/**
		 * ✅ 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
		 */
		'no-unreachable': 2,
		/**
		 * ✅ 禁止在 finally 语句块中出现控制流语句
		 * https://cn.eslint.org/docs/rules/no-unsafe-finally
		 */
		'no-unsafe-finally': 2,
		/**
		 * ✅ 禁止出现未使用过的变量
		 */
		'no-unused-vars': [2, {
			vars: 'all',
			args: 'none',
		}],
		/**
		 * 禁止不必要的 .call() 和 .apply()
		 */
		'no-useless-call': 2,
		/**
		 * 🔧 禁止在对象中使用不必要的计算属性
		 */
		'no-useless-computed-key': 2,
		/**
		 * 禁用不必要的构造函数
		 */
		'no-useless-constructor': 2,
		/**
		 * ✅ 禁用不必要的转义字符
		 */
		'no-useless-escape': 0,
		/**
		 * 🔧 禁止属性前有空白
		 */
		'no-whitespace-before-property': 2,
		/**
		 * ✅ 禁用 with 语句
		 */
		'no-with': 2,
		/**
		 * 🔧 强制函数中的变量要么一起声明要么分开声明
		 */
		'one-var': [2, {
			initialized: 'never',
		}],
		/**
		 * 🔧 强制操作符使用一致的换行符
		 * https://cn.eslint.org/docs/rules/operator-linebreak
		 */
		'operator-linebreak': [2, 'after', {
			overrides: {
				'?': 'before',
				':': 'before',
			}
		}],
		/**
		 * 🔧 要求或禁止块内填充
		 * https://cn.eslint.org/docs/rules/padded-blocks
		 */
		'padded-blocks': [2, 'never'],
		/**
		 * 🔧 强制使用一致的反勾号、双引号或单引号
		 * https://cn.eslint.org/docs/rules/quotes
		 */
		quotes: [2, 'single', {
			avoidEscape: true,
			allowTemplateLiterals: true,
		}],
		/**
		 * 🔧 要求或禁止使用分号代替 ASI（在语句末尾使用分号）
		 */
		semi: [2, 'never'],
		/**
		 * 🔧 强制分号之前和之后使用一致的空格
		 * https://cn.eslint.org/docs/rules/semi-spacing
		 */
		'semi-spacing': [2, {
			before: false,
			after: true
		}],
		/**
		 * 🔧 强制在块之前使用一致的空格
		 */
		'space-before-blocks': [2, 'always'],
		/**
		 * 🔧 强制在 function的左括号之前使用一致的空格
		 */
		'space-before-function-paren': [2, 'never'],
		/**
		 * 🔧 强制在圆括号内使用一致的空格
		 */
		'space-in-parens': [2, 'never'],
		/**
		 * 🔧 要求操作符周围有空格
		 * https://cn.eslint.org/docs/rules/space-infix-ops
		 */
		'space-infix-ops': 2,
		/**
		 * 🔧 强制在一元操作符前后使用一致的空格
		 */
		'space-unary-ops': [2, {
			words: true,
			nonwords: false,
		}],
		/**
		 * 🔧 强制在注释中 // 或 /* 使用一致的空格
		 * https://cn.eslint.org/docs/rules/spaced-comment
		 */
		'spaced-comment': [2, 'always', {
			markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
		}],
		/**
		 * 🔧 要求或禁止模板字符串中的嵌入表达式周围空格的使用
		 */
		'template-curly-spacing': [2, 'never'],
		/**
		 * ✅ 要求使用 isNaN() 检查 NaN
		 */
		'use-isnan': 2,
		/**
		 * ✅ 强制 typeof 表达式与有效的字符串进行比较
		 */
		'valid-typeof': 2,
		/**
		 * 🔧 要求 IIFE 使用括号括起来
		 */
		'wrap-iife': [2, 'any'],
		/**
		 * 🔧 强制在 yield* 表达式中 * 周围使用空格
		 */
		'yield-star-spacing': [2, 'both'],
		/**
		 * 🔧 要求或禁止 “Yoda” 条件
		 * https://cn.eslint.org/docs/rules/yoda
		 */
		yoda: [2, 'never'],
		/**
		 * 🔧 要求使用 const 声明那些声明后不再被修改的变量
		 */
		'prefer-const': 2,
		/**
		 * 🔧 强制在大括号中使用一致的空格
		 * https://cn.eslint.org/docs/rules/object-curly-spacing
		 */
		'object-curly-spacing': [2, 'always', {
			objectsInObjects: false,
		}],
		/**
		 * 🔧 强制数组方括号中使用一致的空格
		 */
		'array-bracket-spacing': [2, 'never'],
	}
}
