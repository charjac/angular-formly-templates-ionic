export default ngModule => {
  ngModule.config(addSelectType)

  const template = `<select ng-model="model[options.key]"></select>`

  function addSelectType(formlyConfigProvider) {
    formlyConfigProvider.setType({
      name: 'select',
      template,
      wrapper: ['ionInput'],
      defaultOptions(options) {
        /* eslint max-len:0 */
        const ngOptions = options.templateOptions.ngOptions || `option[to.valueProp || 'value'] as option[to.labelProp || 'name'] group by option[to.groupProp || 'group'] for option in to.options`
        return {
          ngModelAttrs: {
            [ngOptions]: {
              value: options.templateOptions.optionsAttr || 'ng-options'
            }
          }
        }
      },
      apiCheck: check => ({
        templateOptions: {
          options: check.arrayOf(check.object),
          optionsAttr: check.string.optional,
          labelProp: check.string.optional,
          valueProp: check.string.optional,
          groupProp: check.string.optional
        }
      })
    })
  }
}
