import { BaseService } from ".";

class SubjectService extends BaseService {
  // https://xedocs.ellucian.com/xe-banner-api/ethos_apis/student/validation/subject_get_guid_v4.html
  get(args) {
    this.debug("get:", args.id);
    return this.fetchResponseByURL(
      "application/vnd.hedtech.integration.v4+json",
      `subjects/${args.id}`,
      this.context.authorization
    ).then(json => json);
  }

  // https://xedocs.ellucian.com/xe-banner-api/ethos_apis/student/validation/subjects_get_v4.html
  list(args) {
    this.debug("list");
    let qs = this.createURLParameters({ ...args, max: args.limit });
    return this.fetchResponseByURL(
      "application/vnd.hedtech.integration.v4+json",
      `subjects` + qs,
      this.context.authorization
    ).then(json => json);
  }

  // https://xedocs.ellucian.com/xe-banner-api/ethos_apis/student/validation/subjects_create_v4.html
  create(args) {
    return this.postByURL({
      contentTypeHeader: "application/vnd.hedtech.integration.v4+json",
      acceptHeader: "application/vnd.hedtech.integration.v4+json",
      relativeURL: `subjects`,
      request: args,
      authorization: this.context.authorization
    }).then(json => json);
  }

  // https://xedocs.ellucian.com/xe-banner-api/ethos_apis/student/validation/subjects_update_guid_v4.html
  update(args) {
    return this.putByURL({
      contentTypeHeader: "application/vnd.hedtech.integration.v4+json",
      acceptHeader: "application/vnd.hedtech.integration.v4+json",
      relativeURL: `subjects/${args.id}`,
      request: args,
      authorization: this.context.authorization
    }).then(json => json);
  }
}

export { SubjectService };
