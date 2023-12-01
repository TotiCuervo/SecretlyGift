export const AdministrativeParticipantViewSelect =
    '*, profile!inner(*), exclusions!exclusions_participant_fkey(*, cannot_have_participant!inner(*, profile!inner(*)))'
