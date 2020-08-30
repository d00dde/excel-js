function createButton({ icon, active, value }) {
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(value)}'
  `;
  return `
    <div
      class="button ${active ? 'active' : ''}"
      ${meta}
    >
      <span
        class="material-icons"
        ${meta}
      >
        ${icon}
      </span>
    </div>
  `;
}

export function createToolbar(state) {
  const buttons = [
    {
      icon: 'format_bold',
      active: state.fontWeight === 'bold',
      value: { fontWeight: state.fontWeight === 'bold' ? 'normal' : 'bold' },
    },
    {
      icon: 'format_italic',
      active: state.fontStyle === 'italic',
      value: { fontStyle: state.fontStyle === 'italic' ? 'normal' : 'italic' },
    },
    {
      icon: 'format_underline',
      active: state.textDecoration === 'underline',
      value: {
        textDecoration:
          state.textDecoration === 'underline' ? 'none' : 'underline',
      },
    },
    {
      icon: 'format_align_left',
      active: state.justifyContent === 'left',
      value: { justifyContent: 'left' },
    },
    {
      icon: 'format_align_center',
      active: state.justifyContent === 'center',
      value: { justifyContent: 'center' },
    },
    {
      icon: 'format_align_right',
      active: state.justifyContent === 'right',
      value: { justifyContent: 'right' },
    },
  ];
  return buttons.map(createButton).join('');
}
