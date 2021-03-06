import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-select/dist/react-select.css';


export class PostCreateWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      selectedOption: [],
    };
  }
  addPost = () => {
    const { selectedOption, title, content } = this.state;
    if (title && content) {
      this.props.addPost(selectedOption, title, content);
      this.setState({
        title: '',
        content: '',
        selectedOption: [],
      });
    }
  };

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  handleContentChange = (event) => {
    this.setState({
      content: event.target.value,
    });
  }

  handleChange = (value) => {
    // console.log(value);
    const array = value.split(',');
    this.setState({ selectedOption: array });
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <div >
        <form onSubmit={this.handleSubmit} >
          <div className="container" style={{ padding: '10px', border: '1px solid #AAAAAA', width: '80%' }} >
            <div className="panel panel-default" >
              <div className="panel-heading">
                <table className="table table-bordered" >
                  <thead >
                    <tr >
                      <th style={{ verticalAlign: 'middle' }}> Course </th>
                      <th style={{ width: '90%' }}><Select
                        name="form-field-name"
                        value={selectedOption}
                        onChange={this.handleChange}
                        multi
                        simpleValue
                        options={[
                          { value: 'cs101', label: 'CS101' },
                          { value: 'cs102', label: 'CS102' },
                          { value: 'cs201', label: 'CS201' },
                          { value: 'cs202', label: 'CS202' },
                          { value: 'cs223', label: 'CS223' },
                          { value: 'cs224', label: 'CS224' },
                          { value: 'cs342', label: 'CS342' },
                          { value: 'cs353', label: 'CS353' },
                          { value: 'cs473', label: 'CS473' },
                          { value: 'cs476', label: 'CS476' },
                        ]}
                      />
                    </th>
                    </tr>
                  </thead>
                </table>
              </div>

              <div className="panel-body" style={{ overflow: 'hidden' }}>
                <input onChange={this.handleTitleChange} className="form-control" placeholder ="Title"></input>
                <textarea onChange={this.handleContentChange} className="form-control" rows="5" id="content" placeholder ="Description"></textarea>
                <div style={{ float: 'right' }}>
                  <button type="submit" style={{ marginTop: '5px', marginRight: '2px' }} className="btn btn-secondary" onClick={this.props.cancelPost} >CANCEL</button>
                  <button type="submit" style={{ marginTop: '5px' }} className="btn btn-primary" onClick={this.addPost}>POST</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default PostCreateWidget;
