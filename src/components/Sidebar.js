import React from 'react'
import Link from 'gatsby-link'

const activeStyle = {
  color: '#0057e7',
  fontWeight: 600,
  fontSize: '0.95rem'
}

export default class SideBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      general: [],
      smarthome: []
    }
  }

  filter(pages) {
    let general = []
    let smarthome = []

    // Filter the data
    pages.map(page => {
      switch (page.node.frontmatter.tags) {
        case 'general':
          general.push(page)
          break
        case 'smart home':
          smarthome.push(page)
          break
      }
    })

    this.setState({
      general,
      smarthome
    })
  }

  componentWillMount() {
    // Filter pages into categories
    this.filter(this.props.pageList.allMarkdownRemark.edges)
  }

  render() {
    return (
      <div className="sidebar-wrapper">
        <div className="sidebar">
          <ul className="sidenav">
            <li>
              📝 <em>General</em>
            </li>
            {this.state.general.map((page, index) => (
              <li key={page.node.id}>
                <Link to={page.node.frontmatter.path} activeStyle={activeStyle}>
                  {page.node.frontmatter.title}
                </Link>
              </li>
            ))}
            <li>
              🏠 <em>Smart home automation</em>
            </li>
            {this.state.smarthome.map((page, index) => (
              <li key={page.node.id}>
                <Link to={page.node.frontmatter.path} activeStyle={activeStyle}>
                  {page.node.frontmatter.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
