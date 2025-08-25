# GitHub Workflow Instructions

## 1. Create a New Branch
```
git checkout -b feature/your-feature-name
```
Replace `your-feature-name` with a descriptive name for your feature.

## 2. Make Your Changes
Edit your files as needed for the feature.

## 3. Stage and Commit Changes
```
git add .
git commit -m "Describe your changes here"
```

## 4. Push the Branch to Remote
```
git push origin feature/your-feature-name
```

## 5. Create a GitHub Issue
```
gh issue create --title "Feature Title" --body "Describe the feature and tasks here." --label feature
```

Note: Don't create issue md file

---
name: Feature Request
about: Suggest an idea for this project
title: "[FEATURE REQUEST] "
labels: enhancement
assignees: ''
---

## Is your feature request related to a problem? Please describe.
<!-- A clear and concise description of what the problem is. Ex. I'm always frustrated when [...] -->

## Describe the solution you'd like
<!-- A clear and concise description of what you want to happen -->

## Describe alternatives you've considered
<!-- A clear and concise description of any alternative solutions or features you've considered -->

## Business Value
<!-- Explain the business value or benefits of this feature -->

## Acceptance Criteria
<!-- List the criteria that must be met for this feature to be considered complete -->
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Additional context
<!-- Add any other context or screenshots about the feature request here -->

## Branch
Replace `your-feature-name` with a descriptive name for your feature.

## Labels
Replace `your-labels`

## 6. Create a Pull Request
```
gh pr create --base staging --head feature/your-feature-name --title "Feature Title" --body "Describe what this PR does."
```
Replace `staging` with your target branch if different.

---

Save this file as `workflow_instructions.md` for future reference.
