// https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional
module.exports = {
	rules: {
		'body-leading-blank': [1, 'always'],
		'footer-leading-blank': [1, 'always'],
		'scope-case': [2, 'always', 'lower-case'],
		'subject-case': [2, 'never', [
			'sentence-case', 'start-case', 'pascal-case', 'upper-case'
		]],
		'subject-empty': [2, 'never'],
		'type-case': [2, 'always', 'lower-case'],
		'type-empty': [2, 'never'],
		'type-enum': [2, 'always', [
			'build',
			'chore',
			'ci',
			'docs',
			'feat',
			'fix',
			'perf',
			'refactor',
			'revert',
			'style',
			'test'
		]]
	}
};
