import InvalidAuditException from '../../exceptions/features/audit/InvalidAuditException'
import Audit from './Audit'

export default async function createAudit(user_ref: string, user_type: string, ip: string, action: string, success: boolean) {
  try {
    const audit = await Audit.create({
      user_ref,
      user_type,
      ip,
      action,
      success
    })
    return audit.toJSON()
  } catch (err) {
    throw new InvalidAuditException(err)
  }
}
