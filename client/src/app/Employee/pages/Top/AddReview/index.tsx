import React from 'react'
import { Button, TextArea } from '@blueprintjs/core'
import styles from './AddReview.css'
import api from '~/utils/api'
import { dismiss } from '~/components/Modals'
import { INTENT_DANGER } from '@blueprintjs/core/lib/esm/common/classes'

interface Props {
  reviewee: Employee
  onCreated: (review: Review) => void
}

interface State {
  text: string
}

export default class AddReview extends React.PureComponent<Props, State> {
  state: State = {
    text: ''
  }

  updateField = ({
    currentTarget: { name, value }
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      ...this.state,
      [name as keyof State]: value
    })
  }

  add = async () => {
    const [err, data] = await api.post(
      `/admin/employee/${this.props.reviewee.id}/reviews`,
      {
        ...this.state
      }
    )
    if (!err) {
      dismiss()
      this.props.onCreated(data as Review)
    }
  }

  isValid = () => {
    return this.state.text.trim().length > 0
  }

  render() {
    const { text } = this.state

    return (
      <div className={styles.outer}>
        <TextArea
          growVertically={true}
          large
          name="text"
          onChange={this.updateField}
          value={text}
          placeholder={`how do you think about ${this.props.reviewee.name}`}
          className={styles.textArea}
        />
        <Button
          onClick={this.add}
          intent="success"
          className={styles.save}
          disabled={!this.isValid()}
        >
          Save
        </Button>
      </div>
    )
  }
}
