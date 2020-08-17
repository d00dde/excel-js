function createButton({ icon, active }) {
  const meta = `data-type="button"`;
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

export function createToolbar() {
  const buttons = [
    { icon: 'format_bold', active: false, value: { textAlign: '' } },
    { icon: 'format_italic', active: false, value: { textAlign: '' } },
    { icon: 'format_underline', active: false, value: { textAlign: '' } },
    { icon: 'format_align_left', active: true, value: { textAlign: '' } },
    { icon: 'format_align_center', active: false, value: { textAlign: '' } },
    { icon: 'format_align_right', active: false, value: { textAlign: '' } },
  ];
  return buttons.map(createButton).join('');
}
