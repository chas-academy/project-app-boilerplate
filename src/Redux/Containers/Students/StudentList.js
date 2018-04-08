import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { selectStudent } from '../../Actions/Students'
import StudentDetails from './StudentDetails'

const STUDENTS = [
  {
    name: "Oleg Lopes",
    github: "Oleg-Lopes"
  },
  {
    name: "Patryk Rybaczek",
    github: "patryk7rybaczek"
  },
  {
    name: "Sebastian Gerstel Sollerman",
    github: "SebastianGerS"
  },
  {
    name: "Shukri Mehmed",
    github: "AnEngineero"
  },
  {
    name: "Zaven Hambardzumyan",
    github: "zavham"
  },
  {
    name: "Ludvig Lundgren",
    github: "ludviglundgren"
  },
  {
    name: "Andreas Sjölund",
    github: "Andreas-sjolund-chas"
  },
  {
    name: "Christoffer Malmgren",
    github: "christoffermalmgren"
  },
  {
    name: "Joakim Unge",
    github: "joakimunge"
  },
  {
    name: "Jonas Töremar",
    github: "jonastore"
  },
  {
    name: "Kaveh Haddad",
    github: "Keejv"
  },
  {
    name: "Robert	Jarske Eriksson",
    github: "robertjarske"
  },
  {
    name: "Tom Ekander",
    github: "lessp"
  },
  {
    name: "Alve Ulander",
    github: "ulander-a"
  },
  {
    name: "Anna Ross",
    github: "AnnaRoss"
  },
  {
    name: "Gabriel	von Platen",
    github: "GabrielvonPlaten"
  },
  {
    name: "Martin	Falk Johansson",
    github: "martinfjant"
  },
  {
    name: "Michael Tariao",
    github: "MichaelTariao"
  },
  {
    name: "Pontus Särland",
    github: "PontusSarland88"
  },
  {
    name: "Himon Rana",
    github: "HimonRana"
  },
  {
    name: "Dennis Rohlin",
    github: "dennisrohlin1"
  },
  {
    name: "Felix Tolvers",
    github: "Felixtolvers"
  },
  {
    name: "Laya Sadegh",
    github: "lalaya"
  },
  {
    name: "Robin Carlsten",
    github: "robincarlsten"
  },
  {
    name: "Victor Ciavarella",
    github: "Ciavarella"
  },
  {
    name: "Alexander Grace",
    github: "AlextheGrace"
  },
  {
    name: "Camila Vivanco",
    github: "camilavivanco"
  },
  {
    name: "Christofer Evremar",
    github: "throkk"
  },
  {
    name: "Eleonor Bergqvist",
    github: "eleonorbergqvist"
  },
  {
    name: "Karin Christensen",
    github: "KaChr"
  },
  {
    name: "Sophie Granlöf",
    github: "X3n0m0rphose"
  },
  {
    name: "Ulf Zackrisson",
    github: "Ulmez"
  },
  {
    name: "Eleni Nikou",
    github: "eleninikou"
  },
  {
    name: "Freja Hillström",
    github: "frejah"
  },
  {
    name: "Hossein Alali",
    github: "Tokidaze"
  },
  {
    name: "Ida Englund",
    github: "idaenglund"
  },
  {
    name: "Izabel Rosén",
    github: "izabelrosen"
  },
  {
    name: "Jonathan Jonsson",
    github: "Jonon"
  },
  {
    name: "Roberta Häggström",
    github: "robertahagg"
  }
]

class StudentList extends Component {
  constructor() {
    super()

    this.state = { showStudents: false }
  }

  toggleStudents() {
    const state = !this.state.showStudents

    this.setState({ showStudents: state })
  }

  render() {
    return (
      <div className="students">
        <p>
          <ToggleButton
            onClick={this.toggleStudents.bind(this)}
            showStudents={this.state.showStudents}
          />
        </p>
        <hr />
        {this.state.showStudents &&
          <div>
            <h2 className="page-title-sub">Students</h2>
            <StudentDetails />
            <ul className="list-group">
              <StudentListItems {...this.props} />
            </ul>
          </div>
        }
      </div>
    )
  }
}

const ToggleButton = ({ onClick, showStudents }) => {
  const buttonStateTitle = showStudents ? 'Hide' : 'Show'

  return <button onClick={onClick} className="btn btn-primary">{buttonStateTitle} Students</button>
}

const StudentListItems = ({...props}) => {
  return STUDENTS.map((student, index) => {
    return (
      <li
        key={index}
        onClick={() => {
            props.selectStudent(student, index, props)
          }
        }
        className={handleClassSelectedItem(props.Students.selectedStudent, index)}
      >{student.name}</li>
    )
  })
}

function handleClassSelectedItem(selectedStudent, index) {
  return `list-group-item${selectedStudent === index ? ' selected' : ''}`
}

function mapStateToProps({ Students }) {
  return { Students }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectStudent }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentList)
