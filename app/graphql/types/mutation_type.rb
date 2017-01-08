# Root Query type for changing model state
MutationType = GraphQL::ObjectType.define do
  name 'Mutation'
  description 'The mutation root of this schema for creating or changing data.'
  # Profile updates
  field :UpdateDeveloper, field: Developers::UpdateMutation.field
  field :UpdateAchievement, field: Developers::UpdateAchievement.field
  field :UpdateEmployer, field: Employers::UpdateMutation.field
  field :EmployerFileUpload, field: Employers::FileUploadMutation.field

  # Add to favourite
  field :ToggleFavourite, field: Employers::ToggleFavouriteMutation.field

  # Achievements
  field :ConnectOauth, field: Developers::ConnectOauthMutation.field
  field :PinAchievement, field: Developers::PinAchievementMutation.field
  field :UnpinAchievement, field: Developers::UnpinAchievementMutation.field

  # Mailbox
  field :CreateConversation, field: Mailbox::Conversations::Create.field
  field :TrashConversation, field: Mailbox::Conversations::Trash.field
  field :DeleteConversation, field: Mailbox::Conversations::Delete.field
  field :ReplyToConversation, field: Mailbox::Conversations::Reply.field
  field :MarkAsReadConversation, field: Mailbox::Conversations::MarkAsRead.field
end
