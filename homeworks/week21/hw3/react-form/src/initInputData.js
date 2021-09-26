const inputs = [
  {
    name: 'name',
    id: 'name',
    label: '暱稱',
    type: 'text',
    placeholder: '您的回答'
  },
  {
    name: 'email',
    id: 'email',
    label: '電子郵件',
    type: 'email',
    placeholder: '您的電子郵件'
  },
  {
    name: 'phoneNumber',
    id: 'phoneNumber',
    label: '手機號碼',
    type: 'text',
    placeholder: '您的手機號碼'
  },
  {
    id: 'type',
    label: '報名類型',
    type: 'radio',
    options: [
      {
        name: 'type',
        id: 'imagination',
        label: '躺在床上用想像力實作',
        value: 'imagination'
      },
      {
        name: 'type',
        id: 'copycat',
        label: '趴在地上滑手機找現成的',
        value: 'copycat'
      }
    ]
  },
  {
    name: 'knowFrom',
    id: 'knowFrom',
    label: '怎麼知道這個活動的？',
    type: 'text',
    placeholder: '您的回答'
  },
  {
    name: 'suggestion',
    id: 'suggestion',
    label: '其他',
    type: 'text',
    placeholder: '您的回答',
    description: '對活動的一些建議'
  }
]

export default inputs