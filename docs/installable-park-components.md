# Installable Park UI components

This document lists UI components that can be added to the project using the `mr park:add` task (wrapper around `@park-ui/cli`).

Usage:

```
mr park:add <component-name>
```

### Available components

| Component        |                Install command |
| ---------------- | -----------------------------: |
| accordion        |        `mr park:add accordion` |
| alert            |            `mr park:add alert` |
| breadcrumb       |       `mr park:add breadcrumb` |
| carousel         |         `mr park:add carousel` |
| checkbox         |         `mr park:add checkbox` |
| clipboard        |        `mr park:add clipboard` |
| close-button     |     `mr park:add close-button` |
| code             |             `mr park:add code` |
| collapsible      |      `mr park:add collapsible` |
| color-picker     |     `mr park:add color-picker` |
| combobox         |         `mr park:add combobox` |
| date-picker      |      `mr park:add date-picker` |
| dialog           |           `mr park:add dialog` |
| display-value    |    `mr park:add display-value` |
| editable         |         `mr park:add editable` |
| fieldset         |         `mr park:add fieldset` |
| file-upload      |      `mr park:add file-upload` |
| heading          |          `mr park:add heading` |
| hover-card       |       `mr park:add hover-card` |
| icon             |             `mr park:add icon` |
| image            |            `mr park:add image` |
| input-addon      |      `mr park:add input-addon` |
| input-group      |      `mr park:add input-group` |
| kbd              |              `mr park:add kbd` |
| link             |             `mr park:add link` |
| number-input     |     `mr park:add number-input` |
| pagination       |       `mr park:add pagination` |
| pin-input        |        `mr park:add pin-input` |
| popover          |          `mr park:add popover` |
| radio-card-group | `mr park:add radio-card-group` |
| radio-group      |      `mr park:add radio-group` |
| rating-group     |     `mr park:add rating-group` |
| segment-group    |    `mr park:add segment-group` |
| slider           |           `mr park:add slider` |
| switch           |           `mr park:add switch` |
| tabs             |             `mr park:add tabs` |
| tags-input       |       `mr park:add tags-input` |
| text             |             `mr park:add text` |
| textarea         |         `mr park:add textarea` |
| toast            |            `mr park:add toast` |
| toggle-group     |     `mr park:add toggle-group` |
| tooltip          |          `mr park:add tooltip` |

> Notes:
>
> - These component names map to files under `src/shared/components/ui/` and their `theme/recipes/` counterparts once installed by the Park UI CLI.
> - Important: `mr park:add` scaffolds components from the `@park-ui/cli` templates; it does **not** create new components in the Park UI registry — you can only add components that the CLI provides.
> - After adding a component run `mr park:fix` (or `mr park:fix` runs automatically as a post-task) to apply codemods and lint/format fixes.
