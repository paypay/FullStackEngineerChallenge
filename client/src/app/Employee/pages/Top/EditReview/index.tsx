import React from 'react'
import { Button, TextArea } from '@blueprintjs/core'
import styles from './EditReview.css'
import api from '~/utils/api'
import { dismiss } from '~/components/Modals'

interface Props {
  review: Review
  onSaved: (review: Review) => void
}

interface State {
  text: string
}

export default class EditReview extends React.PureComponent<Props, State> {
  state: State = {
    text: this.props.review.text
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
    const { review, onSaved } = this.props
    const [err] = await api.put(`/review/${review.id}`, {
      ...this.state
    })
    if (!err) {
      dismiss()
      onSaved({
        ...review,
        ...this.state
      })
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
          placeholder={`how do you think about ${this.props.review.reviewee.name}`}
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
