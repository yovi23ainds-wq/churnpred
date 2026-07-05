# Contributing to Customer Churn Prediction Dashboard

First off, thank you for considering contributing to this project! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on what is best for the community
- Show empathy towards other community members

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, Python version, Node version)

**Bug Report Template:**
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
 - OS: [e.g. macOS, Windows, Linux]
 - Python Version: [e.g. 3.9]
 - Node Version: [e.g. 18.0]
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** - Why is this enhancement useful?
- **Proposed solution**
- **Alternative solutions** you've considered
- **Additional context**

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:
- `good first issue` - Simple issues for beginners
- `help wanted` - Issues that need attention
- `documentation` - Documentation improvements

## 🛠️ Development Setup

### Prerequisites

- Python 3.8+
- Node.js 16+
- Git

### Setup Steps

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/churn-prediction-dashboard.git
   cd churn-prediction-dashboard
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/churn-prediction-dashboard.git
   ```

4. **Backend setup**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   pip install -r requirements-dev.txt  # Development dependencies
   ```

5. **Frontend setup**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

6. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 Coding Standards

### Python (Backend)

Follow **PEP 8** style guide:

```python
# Good
def calculate_churn_probability(customer_data: dict) -> float:
    """
    Calculate churn probability for a customer.
    
    Args:
        customer_data: Dictionary containing customer features
        
    Returns:
        Churn probability between 0 and 1
    """
    # Implementation
    pass

# Bad
def calc(d):
    # No docstring, unclear names
    pass
```

**Key Points:**
- Use 4 spaces for indentation
- Maximum line length: 88 characters (Black formatter)
- Use type hints
- Write docstrings for functions and classes
- Use meaningful variable names

**Tools:**
```bash
# Format code
black app/

# Check style
flake8 app/

# Type checking
mypy app/
```

### JavaScript/React (Frontend)

Follow **Airbnb JavaScript Style Guide**:

```javascript
// Good
const PredictionCard = ({ probability, riskLevel }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="card">
      {/* Component content */}
    </div>
  );
};

// Bad
function card(p, r) {
  // Unclear names, no destructuring
}
```

**Key Points:**
- Use functional components with hooks
- Use destructuring for props
- Use meaningful component and variable names
- Keep components small and focused
- Use PropTypes or TypeScript

**Tools:**
```bash
# Lint code
npm run lint

# Format code
npm run format

# Fix auto-fixable issues
npm run lint:fix
```

### CSS/Tailwind

```javascript
// Good - Organized, readable
<button className="
  px-6 py-2.5 
  bg-primary-600 hover:bg-primary-700 
  text-white font-medium 
  rounded-lg 
  transition-colors duration-200
">
  Submit
</button>

// Bad - Unorganized
<button className="px-6 text-white bg-primary-600 py-2.5 rounded-lg hover:bg-primary-700 font-medium transition-colors duration-200">
```

## 📝 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```bash
# Good commits
git commit -m "feat(api): add batch prediction endpoint"
git commit -m "fix(ui): resolve gauge chart rendering issue"
git commit -m "docs: update installation instructions"
git commit -m "test(predictor): add unit tests for feature engineering"

# Bad commits
git commit -m "fixed stuff"
git commit -m "updates"
git commit -m "WIP"
```

### Commit Best Practices

- Write clear, descriptive commit messages
- Keep commits atomic (one logical change per commit)
- Commit often, push regularly
- Don't commit generated files or dependencies
- Reference issues in commits: `fixes #123`

## 🔄 Pull Request Process

### Before Submitting

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests**
   ```bash
   # Backend tests
   pytest
   
   # Frontend tests
   cd frontend && npm test
   ```

3. **Check code quality**
   ```bash
   # Backend
   black app/
   flake8 app/
   
   # Frontend
   npm run lint
   ```

4. **Update documentation**
   - Update README if needed
   - Add/update docstrings
   - Update CHANGELOG.md

### Submitting Pull Request

1. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request on GitHub**
   - Use a clear, descriptive title
   - Fill out the PR template
   - Link related issues
   - Add screenshots for UI changes

3. **PR Template**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update
   
   ## Testing
   - [ ] Tests pass locally
   - [ ] Added new tests
   - [ ] Updated documentation
   
   ## Screenshots (if applicable)
   
   ## Related Issues
   Fixes #123
   ```

### Review Process

- Maintainers will review your PR
- Address feedback and requested changes
- Keep the PR updated with main branch
- Once approved, maintainers will merge

## 🧪 Testing

### Backend Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app

# Run specific test file
pytest tests/test_predictor.py

# Run specific test
pytest tests/test_predictor.py::test_prediction
```

### Frontend Tests

```bash
cd frontend

# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test
npm test -- StepperForm.test.jsx
```

### Writing Tests

**Backend (pytest):**
```python
def test_predict_low_risk():
    """Test prediction for low-risk customer."""
    customer_data = {
        "Tenure": 24,
        "SatisfactionScore": 5,
        # ... other fields
    }
    
    result = predict_churn(customer_data)
    
    assert result["risk_level"] == "Low"
    assert result["churn_probability"] < 0.3
```

**Frontend (Jest + React Testing Library):**
```javascript
test('renders prediction form', () => {
  render(<StepperForm onSubmit={mockSubmit} />);
  
  expect(screen.getByText('Customer Profile')).toBeInTheDocument();
  expect(screen.getByLabelText('Tenure')).toBeInTheDocument();
});
```

## 📚 Documentation

### Code Documentation

**Python:**
```python
def calculate_risk_level(probability: float) -> str:
    """
    Calculate risk level based on churn probability.
    
    Args:
        probability: Churn probability between 0 and 1
        
    Returns:
        Risk level: "Low", "Medium", or "High"
        
    Raises:
        ValueError: If probability is not between 0 and 1
        
    Examples:
        >>> calculate_risk_level(0.2)
        'Low'
        >>> calculate_risk_level(0.8)
        'High'
    """
    if not 0 <= probability <= 1:
        raise ValueError("Probability must be between 0 and 1")
        
    if probability < 0.3:
        return "Low"
    elif probability < 0.7:
        return "Medium"
    else:
        return "High"
```

**JavaScript:**
```javascript
/**
 * Sanitize customer data before sending to API
 * 
 * @param {Object} data - Raw customer data from form
 * @returns {Object} Sanitized data with correct types
 * 
 * @example
 * const sanitized = sanitizeData({ Tenure: "12", CityTier: "1" });
 * // Returns: { Tenure: 12, CityTier: 1 }
 */
const sanitizeData = (data) => {
  // Implementation
};
```

## 🎯 Areas for Contribution

### High Priority
- [ ] Add user authentication
- [ ] Implement prediction history
- [ ] Add batch predictions
- [ ] Improve test coverage
- [ ] Performance optimizations

### Medium Priority
- [ ] Add more ML models
- [ ] Create admin dashboard
- [ ] Add email integration
- [ ] Implement caching
- [ ] Add monitoring/logging

### Low Priority
- [ ] Mobile app
- [ ] Dark mode
- [ ] Internationalization
- [ ] Advanced analytics
- [ ] Export features

## 💬 Communication

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and general discussion
- **Pull Requests**: Code contributions
- **Email**: For private matters

## 🏆 Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Given credit in documentation

## ❓ Questions?

Don't hesitate to ask questions:
- Open a GitHub Discussion
- Comment on relevant issues
- Reach out to maintainers

---

Thank you for contributing! 🎉

**Happy Coding!** 💻
