/*
 {
    "descendant_id": "string",
    "descendant_name": "string",
    "descendant_image_url": "string",
    "descendant_stat": [
      {
        "level": 0,
        "stat_detail": [
          {
            "stat_type": "string",
            "stat_value": 0
          }
        ]
      }
    ],
    "descendant_skill": [
      {
        "skill_type": "string",
        "skill_name": "string",
        "element_type": "string",
        "arche_type": "string",
        "skill_image_url": "string",
        "skill_description": "string"
      }
    ]
  }
*/
function process(descendants) {
    const descendantDetail = [];
    for (const desc of descendants) {
        console.log(desc);
    }
}

export { process };